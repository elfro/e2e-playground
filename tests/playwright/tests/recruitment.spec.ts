import path from 'path';
import { faker } from '@faker-js/faker';
import { expect, test } from '../fixtures/setup.fixture';
import { CandidatesPo } from '../page-objects/admin/recruitment/candidates.po';
import { VacanciesPo } from '../page-objects/admin/recruitment/vacancies.po';
import { ApplyVacancyPo } from '../page-objects/apply-vacancy.po';
import { CandidatesFilterOptions } from '../types/CandidatesFilterOptions';
import { VacanciesFilterOptions } from '../types/VacanciesFilterOptions';
import { JobTitleAPI } from '../types/JobTitleAPI';
import { UserAPI } from '../types/UserAPI';
import { VacancyAPI } from '../types/VacancyAPI';
import { ResumeData } from '../types/ResumeData';
import { ModulesAPI } from '../types/ModulesAPI';
import { CandidateFilterResultsData } from '../types/CandidateFilterResultsData';
import { VacanciesFilterResultsData } from '../types/VacanciesFilterResultsData';

test.describe('Recruitment module', () => {
  let newVacancy: VacancyAPI;
  let newCandidate: ResumeData;
  let initialModulesState: ModulesAPI;

  test.beforeAll(async ({ httpClient }) => {
    initialModulesState = await httpClient.getModules();
    await httpClient.updateModules({
      ...initialModulesState,
      recruitment: true,
    });
  });

  test.beforeAll(async ({ httpClient }) => {
    newCandidate = generateCandidateData();
    console.log(newCandidate);

    const jobTitles = await httpClient.getJobTitles();
    const users = await httpClient.getUsers();

    const randomJobTitle = getRandomArrayElement(jobTitles) as JobTitleAPI;

    const activeUsers = users.filter(({ deleted }) => !deleted);
    const randomUser = getRandomArrayElement(activeUsers) as UserAPI;

    newVacancy = await httpClient.createVacancy(generateVacancyData(randomJobTitle, randomUser));
    console.log(newVacancy);
  });

  test.afterAll(async ({ httpClient }) => {
    const candidates = await httpClient.getCandidatesList();

    const candidateToDelete = candidates.find(
      candidate =>
        candidate.vacancy &&
        candidate.vacancy.id === newVacancy.id &&
        candidate.firstName === newCandidate.firstName &&
        candidate.lastName === newCandidate.lastName,
    );

    await httpClient.deleteCandidate([candidateToDelete.id]);
    await httpClient.deleteVacancy([newVacancy.id]);
    await httpClient.updateModules(initialModulesState);
  });

  test('should filter Candidates', async ({ page }) => {
    const applyVacancyPage = new ApplyVacancyPo(page);
    await applyVacancyPage.goto(newVacancy.id.toString());
    await applyVacancyPage.applyVacancyComponent.fillInForm(newCandidate);
    await applyVacancyPage.modalComponent.clickOnOkButton();

    const candidatesPage = new CandidatesPo(page);

    await candidatesPage.goto();
    await expect(candidatesPage.getCandidatesContainer()).toBeVisible();
    const filterOptions: CandidatesFilterOptions = {
      vacancy: newVacancy.name,
    };
    await candidatesPage.tableFilterComponent.selectFilters(filterOptions);
    await candidatesPage.dataTableComponent.waitForPreloaderDisappear();

    // ToDo: FIX
    await page.waitForTimeout(1000);
    const candidates: CandidateFilterResultsData[] = await candidatesPage.dataTableComponent.collectTableData();

    expect(
      candidates.every(
        candidate =>
          candidate.vacancy.includes(filterOptions.vacancy) && candidate.candidate.includes(getFullname(newCandidate)),
      ),
    ).toBeTruthy();

    console.log(candidates);
  });

  test('should filter Vacancies', async ({ page }) => {
    const vacanciesPage = new VacanciesPo(page);

    const filterVacanciesOptions: VacanciesFilterOptions = {
      status: 'Active',
      vacancy: newVacancy.name,
    };
    await vacanciesPage.goto();
    await page.waitForResponse('/web/index.php/api/v2/recruitment/hiring-managers?limit=0');
    await vacanciesPage.dataTableComponent.waitForPreloaderDisappear();

    await vacanciesPage.tableFilterComponent.selectFilters(filterVacanciesOptions);

    await vacanciesPage.dataTableComponent.waitForPreloaderDisappear();
    const vacancies: VacanciesFilterResultsData[] = await vacanciesPage.dataTableComponent.collectTableData();

    console.log(vacancies);
    expect(vacancies.every(v => v.vacancy === filterVacanciesOptions.vacancy)).toBeTruthy();
  });
});

function generateCandidateData() {
  const filePath = path.join(__dirname, '../../../upload/To-do.pdf');
  const candidate: ResumeData = {
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    email: `test${Date.now()}@test.com`,
    contactNumber: faker.string.numeric(10),
    file: filePath,
  };

  return candidate;
}

function getFullname({ firstName, middleName, lastName }: ResumeData) {
  return `${firstName} ${middleName} ${lastName}`.replace(/\s\s+/g, ' ');
}

function generateVacancyData(jobTitle: JobTitleAPI, hiringManager: UserAPI) {
  return {
    name: `Middle ${jobTitle.title} ${Date.now()}`,
    jobTitleId: jobTitle.id,
    employeeId: hiringManager.employee.empNumber,
    numOfPositions: 1,
    description: `We're looking for ${jobTitle.title}`,
    status: true,
    isPublished: true,
  };
}

function getRandomArrayElement(array: unknown[]) {
  return array[Math.floor(Math.random() * array.length)];
}
