import { Page } from '@playwright/test';
import { DataTableComponent } from './data-table.component';
import { CandidateFilterResultsData } from '../../types/CandidateFilterResultsData';

export class CandidatesTableComponent extends DataTableComponent<CandidateFilterResultsData> {
  constructor(page: Page) {
    super(page);
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
