import { Page } from '@playwright/test';
import { BasePagePo } from '../../base-page.po';
import { VacanciesFilterComponent } from '../../../components/filters/vacancies-filter.component';
import { VacanciesTableComponent } from '../../../components/data-table/vacancies-table.component';
import { VacanciesFilterOptions } from '../../../types/ui/VacanciesFilterOptions';
import { appURLs } from '../../../constants/app-urls.const';

export class VacanciesPo extends BasePagePo {
  private readonly _tableFilterComponent: VacanciesFilterComponent;
  private readonly _dataTableComponent: VacanciesTableComponent;

  constructor(page: Page) {
    super(page, appURLs.pages.recruitment.vacancies);
    this._tableFilterComponent = new VacanciesFilterComponent(page);
    this._dataTableComponent = new VacanciesTableComponent(page);
  }

  async goto(subPath?: string) {
    await super.goto(subPath, [appURLs.api.hiringManagers]);
    await this._dataTableComponent.waitForPreloaderDisappear();
  }

  async selectFilters(filterOptions: VacanciesFilterOptions) {
    await this._tableFilterComponent.selectFilters(filterOptions);
    await this.waitForRequestsAreFinished([appURLs.api.vacancies]);
    await this._dataTableComponent.waitForPreloaderDisappear();
  }

  get tableFilterComponent(): VacanciesFilterComponent {
    return this._tableFilterComponent;
  }

  get dataTableComponent(): VacanciesTableComponent {
    return this._dataTableComponent;
  }
}
