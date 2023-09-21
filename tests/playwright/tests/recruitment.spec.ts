import { expect, test } from '@playwright/test';
import { CandidatesPo } from '../page-objects/admin/recruitment/candidates.po';
import { CandidatesFilterOptions } from '../types/CandidatesFilterOptions';
import { VacanciesPo } from '../page-objects/admin/recruitment/vacancies.po';
import { VacanciesFilterOptions } from '../types/VacanciesFilterOptions';

test.describe('Recruitment module', () => {
  test('should filter Candidates', async ({ page }) => {
    const candidatesPage = new CandidatesPo(page);

    await candidatesPage.goto();
    await expect(candidatesPage.getCandidatesContainer()).toBeVisible();

    const filterOptions: CandidatesFilterOptions = {
      vacancy: 'Senior QA Lead',
    };
    await candidatesPage.tableFilterComponent.selectFilters(filterOptions);
    await candidatesPage.dataTableComponent.waitForPreloaderDisappear();

    const candidates = await candidatesPage.dataTableComponent.collectData();

    expect(
      candidates.every((candidate) =>
        candidate.vacancy.includes(filterOptions.vacancy),
      ),
    ).toBeTruthy();

    console.log(candidates);
  });
  test('should filter Vacancies', async ({ page }) => {
    const vacanciesPage = new VacanciesPo(page);

    const filterVacanciesOptions: VacanciesFilterOptions = {
      status: 'Active',
    };
    await vacanciesPage.goto();
    await vacanciesPage.tableFilterComponent.selectFilters(
      filterVacanciesOptions,
    );

    await vacanciesPage.dataTableComponent.waitForPreloaderDisappear();
    const vacancies = await vacanciesPage.dataTableComponent.collectData();

    console.log(vacancies);
  });
});
