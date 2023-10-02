import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base.component';

export class ModalWindowComponent extends BaseComponent {
  private readonly titleEl: Locator;
  private readonly descriptionEl: Locator;
  private readonly buttonEl: Locator;

  constructor(page: Page) {
    super(page);
    this.titleEl = this.page.locator('.oxd-text--card-title');
    this.descriptionEl = this.page.locator('.oxd-text--card-body');
    this.buttonEl = this.page.locator('.orangehrm-modal-footer .oxd-button');
  }

  getTitle() {
    return this.titleEl;
  }

  getDescription() {
    return this.descriptionEl;
  }

  async clickOnOkButton() {
    await this.buttonEl.click();
  }
}
