import { Page } from '@playwright/test';
import { DataTableComponent } from './data-table.component';

export class CandidatesTableComponent extends DataTableComponent {
  constructor(page: Page) {
    super(page);
  }

  async collectTableData<CandidateFilterResultsData>() {
    return this.collectData<CandidateFilterResultsData>();
  }

  protected dataParser<CandidateFilterResultsData>(data: string[]) {
    const [vacancy, candidate, hiringManager, dateOfApplication, status] = data;

    return {
      vacancy,
      candidate,
      hiringManager,
      dateOfApplication,
      status,
    } as CandidateFilterResultsData;
  }
}
