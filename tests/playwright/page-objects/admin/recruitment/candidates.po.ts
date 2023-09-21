import { Locator, Page } from '@playwright/test';
import { BasePagePo } from '../../base-page.po';
import { CandidatesFilterComponent } from '../../../components/filters/candidates-filter.component';
import { CandidatesTableComponent } from '../../../components/data-table/candidates-table.component';

export class CandidatesPo extends BasePagePo {
  private readonly mainContainerLocator: Locator;
  private readonly _tableFilterComponent: CandidatesFilterComponent;
  private readonly _dataTableComponent: CandidatesTableComponent;

  constructor(page: Page) {
    super(page, '/web/index.php/recruitment/viewCandidates');
    this._tableFilterComponent = new CandidatesFilterComponent(page);
    this._dataTableComponent = new CandidatesTableComponent(page);
    this.mainContainerLocator = page.locator('.orangehrm-candidate-page');
  }

  getCandidatesContainer() {
    return this.mainContainerLocator;
  }

  get tableFilterComponent(): CandidatesFilterComponent {
    return this._tableFilterComponent;
  }

  get dataTableComponent(): CandidatesTableComponent {
    return this._dataTableComponent;
  }
}
