import { Page } from '@playwright/test';
import { BasePagePo } from '../../base-page.po';
import { VacanciesFilterComponent } from '../../../components/filters/vacancies-filter.component';
import { VacanciesTableComponent } from '../../../components/data-table/vacancies-table.component';

export class VacanciesPo extends BasePagePo {
  private readonly _tableFilterComponent: VacanciesFilterComponent;
  private readonly _dataTableComponent: VacanciesTableComponent;

  constructor(page: Page) {
    super(page, '/web/index.php/recruitment/viewJobVacancy');
    this._tableFilterComponent = new VacanciesFilterComponent(page);
    this._dataTableComponent = new VacanciesTableComponent(page);
  }

  get tableFilterComponent(): VacanciesFilterComponent {
    return this._tableFilterComponent;
  }

  get dataTableComponent(): VacanciesTableComponent {
    return this._dataTableComponent;
  }
}
