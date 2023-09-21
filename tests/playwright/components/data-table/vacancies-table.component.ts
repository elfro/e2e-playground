import { DataTableComponent } from './data-table.component';
import { VacanciesFilterResultsData } from '../../types/VacanciesFilterResultsData';
import { Page } from '@playwright/test';

export class VacanciesTableComponent extends DataTableComponent<VacanciesFilterResultsData> {
  constructor(page: Page) {
    super(page);
  }

  protected dataParser<VacanciesFilterResultsData>(data: string[]) {
    const [vacancy, jobTitle, hiringManager, status] = data;

    return {
      vacancy,
      jobTitle,
      hiringManager,
      status,
    } as VacanciesFilterResultsData;
  }
}
