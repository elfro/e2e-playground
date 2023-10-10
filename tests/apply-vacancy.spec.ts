import { expect, test } from './fixtures/httpclient.fixture';
import { ApplyVacancyPo } from '../src/page-objects/apply-vacancy.po';
import { CandidatesPo } from '../src/page-objects/admin/recruitment/candidates.po';
import { ResumeData } from '../src/types/ui/ResumeData';
import { CandidateFactory } from '../src/test-data-helpers/candidate-factory';
import { VacancyFactory } from '../src/test-data-helpers/vacancy-factory';
import { JobTitleAPI } from '../src/types/api/JobTitleAPI';
import { ModulesAPI } from '../src/types/api/ModulesAPI';
import { VacancyAPI } from '../src/types/api/VacancyAPI';
import { UserAPI } from '../src/types/api/UserAPI';
import { CandidateFilterResultsData } from '../src/types/ui/CandidateFilterResultsData';

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

    await applyVacancyPage.goto(newVacancy.id.toString());
    await applyVacancyPage.applyVacancyComponent.fillInForm(newCandidate);
    await applyVacancyPage.modalComponent.clickOnOkButton();

    await candidatesPage.goto();
    const candidates: CandidateFilterResultsData[] = await candidatesPage.dataTableComponent.collectTableData();
    const matched = candidates.filter(
      c => c.vacancy.includes(newVacancy.name) && c.candidate.includes(getFullname(newCandidate)),
    );

    expect(matched, getErrorMessage(newCandidate, candidates)).toHaveLength(1);
  });
});

function getFullname({ firstName, middleName, lastName }: ResumeData) {
  return `${firstName} ${middleName} ${lastName}`.replace(/\s\s+/g, ' ');
}

function getRandomArrayElement(array: unknown[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function getErrorMessage(newCandidate: unknown, candidates: unknown) {
  return `New candidate is absent in the Candidates table:
      New Candidate:\n${JSON.stringify(newCandidate, null, '\t')},
      Candidates from the page:\n${JSON.stringify(candidates, null, '\t')}`;
}
