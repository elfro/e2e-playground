import { Page } from '@playwright/test';
import { BasePagePo } from './base-page.po';
import { ModalWindowComponent } from '../components/modal-window.component';
import { ApplyVacancyComponent } from '../components/apply-vacancy.component';

export class ApplyVacancyPo extends BasePagePo {
  private readonly _applyVacancyComponent: ApplyVacancyComponent;
  private readonly _modalComponent: ModalWindowComponent;

  constructor(page: Page) {
    super(page, '/web/index.php/recruitmentApply/applyVacancy/id');
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
