import { expect, test } from './fixtures/httpclient.fixture';
import { CandidatesPo } from '../src/page-objects/admin/recruitment/candidates.po';
import { VacanciesPo } from '../src/page-objects/admin/recruitment/vacancies.po';
import { CandidateFactory } from '../src/test-data-helpers/candidate-factory';
import { VacancyFactory } from '../src/test-data-helpers/vacancy-factory';
import { UserAPI } from '../src/types/api/UserAPI';
import { VacancyAPI } from '../src/types/api/VacancyAPI';
import { ModulesAPI } from '../src/types/api/ModulesAPI';
import { JobTitleAPI } from '../src/types/api/JobTitleAPI';
import { CandidateResponseAPI } from '../src/types/api/CandidateAPI';
import { CandidatesFilterOptions } from '../src/types/ui/CandidatesFilterOptions';
import { VacanciesFilterOptions } from '../src/types/ui/VacanciesFilterOptions';
import { CandidateFilterResultsData } from '../src/types/ui/CandidateFilterResultsData';
import { VacanciesFilterResultsData } from '../src/types/ui/VacanciesFilterResultsData';

test.describe('Recruitment module', () => {
  let initialModulesState: ModulesAPI;
  let newVacancy: VacancyAPI;
  let newCandidate: CandidateResponseAPI;

  test.beforeAll(async ({ httpClient }) => {
    initialModulesState = await httpClient.getModules();
    await httpClient.updateModules({
      ...initialModulesState,
      recruitment: true,
    });
  });

  test.beforeAll(async ({ httpClient }) => {
    const jobTitles = await httpClient.getJobTitles();
    const activeUsers = (await httpClient.getUsers()).filter(({ deleted }) => !deleted);

    const randomJobTitle = getRandomArrayElement(jobTitles) as JobTitleAPI;
    const randomUser = getRandomArrayElement(activeUsers) as UserAPI;

    newVacancy = await httpClient.createVacancy(VacancyFactory.generateVacancyAPIData(randomJobTitle, randomUser));
    newCandidate = await httpClient.createCandidate(CandidateFactory.generateCandidateAPIData(newVacancy));
  });

  test.afterAll(async ({ httpClient }) => {
    await httpClient.deleteCandidate([newCandidate.id]);
    await httpClient.deleteVacancy([newVacancy.id]);
    await httpClient.updateModules(initialModulesState);
  });

  test('should filter Candidates and check results are correct', async ({ page }) => {
    const candidatesPage = new CandidatesPo(page);
    const filterOptions: CandidatesFilterOptions = {
      vacancy: newVacancy.name,
    };

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

function getFullname({ firstName, middleName, lastName }: CandidateResponseAPI) {
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
