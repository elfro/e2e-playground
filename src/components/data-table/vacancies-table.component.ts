import { DataTableComponent } from './data-table.component';
import { Page } from '@playwright/test';

export class VacanciesTableComponent extends DataTableComponent {
  constructor(page: Page) {
    super(page);
  }

  async collectTableData<VacanciesFilterResultsData>() {
    return this.collectData<VacanciesFilterResultsData>();
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
