import { Page } from '@playwright/test';
import { BasePagePo } from './base-page.po';
import { ModalWindowComponent } from '../components/modal-window.component';
import { ApplyVacancyComponent } from '../components/apply-vacancy.component';
import { appURLs } from '../constants/app-urls.const';

export class ApplyVacancyPo extends BasePagePo {
  private readonly _applyVacancyComponent: ApplyVacancyComponent;
  private readonly _modalComponent: ModalWindowComponent;

  constructor(page: Page) {
    super(page, appURLs.pages.applyVacancy);
    this._modalComponent = new ModalWindowComponent(this.page);
    this._applyVacancyComponent = new ApplyVacancyComponent(this.page);
  }

  get applyVacancyComponent(): ApplyVacancyComponent {
    return this._applyVacancyComponent;
  }

  get modalComponent(): ModalWindowComponent {
    return this._modalComponent;
  }
}
