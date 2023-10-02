import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base.component';
export class HeaderComponent extends BaseComponent {
  private readonly userDropDownMenuEl: Locator;

  constructor(page: Page) {
    super(page);
    this.userDropDownMenuEl = this.page.locator('.oxd-userdropdown');
  }

  getUserDropDownMenu() {
    return this.userDropDownMenuEl;
  }
}
