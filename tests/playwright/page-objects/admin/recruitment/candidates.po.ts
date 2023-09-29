import { Page } from '@playwright/test';
import { BasePagePo } from '../../base-page.po';
import { CandidatesFilterComponent } from '../../../components/filters/candidates-filter.component';
import { CandidatesTableComponent } from '../../../components/data-table/candidates-table.component';
import { CandidatesFilterOptions } from '../../../types/ui/CandidatesFilterOptions';
import { appURLs } from '../../../constants/app-urls.const';

export class CandidatesPo extends BasePagePo {
  private readonly _tableFilterComponent: CandidatesFilterComponent;
  private readonly _dataTableComponent: CandidatesTableComponent;

  constructor(page: Page) {
    super(page, appURLs.pages.recruitment.candidates);
    this._tableFilterComponent = new CandidatesFilterComponent(page);
    this._dataTableComponent = new CandidatesTableComponent(page);
  }

  async goto(subPath?: string) {
    await super.goto(subPath, [
      appURLs.api.hiringManagers,
      appURLs.api.candidateStatuses,
      appURLs.api.leaveWorkweek,
      appURLs.api.leaveHolidays,
    ]);
  }

  async selectFilters(filterOptions: CandidatesFilterOptions) {
    await this._tableFilterComponent.selectFilters(filterOptions);
    await this.waitForRequestsAreFinished([appURLs.api.candidates]);
    await this._dataTableComponent.waitForPreloaderDisappear();
  }

  get tableFilterComponent(): CandidatesFilterComponent {
    return this._tableFilterComponent;
  }

  get dataTableComponent(): CandidatesTableComponent {
    return this._dataTableComponent;
  }
}
