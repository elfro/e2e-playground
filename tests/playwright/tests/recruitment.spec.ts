import { expect, test } from './fixtures/httpclient.fixture';
import { CandidatesPo } from '../page-objects/admin/recruitment/candidates.po';
import { VacanciesPo } from '../page-objects/admin/recruitment/vacancies.po';
import { ApplyVacancyPo } from '../page-objects/apply-vacancy.po';
import { CandidateFactory } from '../test-data-helpers/candidate-factory';
import { VacancyFactory } from '../test-data-helpers/vacancy-factory';
import { UserAPI } from '../types/api/UserAPI';
import { VacancyAPI } from '../types/api/VacancyAPI';
import { ModulesAPI } from '../types/api/ModulesAPI';
import { ResumeData } from '../types/ui/ResumeData';
import { JobTitleAPI } from '../types/api/JobTitleAPI';
import { CandidatesFilterOptions } from '../types/ui/CandidatesFilterOptions';
import { VacanciesFilterOptions } from '../types/ui/VacanciesFilterOptions';
import { CandidateFilterResultsData } from '../types/ui/CandidateFilterResultsData';
import { VacanciesFilterResultsData } from '../types/ui/VacanciesFilterResultsData';

test.describe('Recruitment module', () => {
  let initialModulesState: ModulesAPI;
  let newVacancy: VacancyAPI;
  let newCandidate: ResumeData;

  test.beforeAll(async ({ httpClient }) => {
    initialModulesState = await httpClient.getModules();
    await httpClient.updateModules({
      ...initialModulesState,
      recruitment: true,
    });
  });

  test.beforeAll(async ({ httpClient }) => {
    newCandidate = CandidateFactory.generateCandidateUIData();
    const jobTitles = await httpClient.getJobTitles();
    const activeUsers = (await httpClient.getUsers()).filter(({ deleted }) => !deleted);

    const randomJobTitle = getRandomArrayElement(jobTitles) as JobTitleAPI;
    const randomUser = getRandomArrayElement(activeUsers) as UserAPI;

    newVacancy = await httpClient.createVacancy(VacancyFactory.generateVacancyAPIData(randomJobTitle, randomUser));
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

    if (candidateToDelete) {
      await httpClient.deleteCandidate([candidateToDelete.id]);
    }
    await httpClient.deleteVacancy([newVacancy.id]);
    await httpClient.updateModules(initialModulesState);
  });

  test('should apply vacancy and check that record appears on the Candidates page', async ({ page }) => {
    const applyVacancyPage = new ApplyVacancyPo(page);
    const candidatesPage = new CandidatesPo(page);
    const filterOptions: CandidatesFilterOptions = {
      vacancy: newVacancy.name,
    };

    await applyVacancyPage.goto(newVacancy.id.toString());
    await applyVacancyPage.applyVacancyComponent.fillInForm(newCandidate);
    await applyVacancyPage.modalComponent.clickOnOkButton();
    await candidatesPage.goto();
    await candidatesPage.selectFilters(filterOptions);
    const candidates: CandidateFilterResultsData[] = await candidatesPage.dataTableComponent.collectTableData();
    const notMatched = candidates.filter(
      c => !c.vacancy.includes(filterOptions.vacancy) || !c.candidate.includes(getFullname(newCandidate)),
    );

    expect(notMatched, getErrorMessageFilterTest(filterOptions, notMatched)).toHaveLength(0);
  });

  test('should filter Vacancies and check results are correct', async ({ page }) => {
    const vacanciesPage = new VacanciesPo(page);
    const filterOptions: VacanciesFilterOptions = {
      status: 'Active',
      vacancy: newVacancy.name,
    };

    await vacanciesPage.goto();
    await vacanciesPage.selectFilters(filterOptions);
    const vacancies: VacanciesFilterResultsData[] = await vacanciesPage.dataTableComponent.collectTableData();
    const notMatched = vacancies.filter(v => v.vacancy !== filterOptions.vacancy);

    expect(notMatched, getErrorMessageFilterTest(filterOptions, notMatched)).toHaveLength(0);
  });
});

function getFullname({ firstName, middleName, lastName }: ResumeData) {
  return `${firstName} ${middleName} ${lastName}`.replace(/\s\s+/g, ' ');
}

function getRandomArrayElement(array: unknown[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function getErrorMessageFilterTest(filterOptions: unknown, notMatched: unknown) {
  return `The following filtered results don't contain the queried values:
      Filter options:\n${JSON.stringify(filterOptions, null, '\t')},
      Filtered results:\n${JSON.stringify(notMatched, null, '\t')}`;
}
