import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base.component';

export class LoginFormComponent extends BaseComponent {
  private readonly inputUsernameEl: Locator;
  private readonly inputPasswordEl: Locator;
  private readonly buttonSubmitEl: Locator;

  constructor(page: Page) {
    super(page);
    this.inputUsernameEl = this.page.locator('input[name="username"]');
    this.inputPasswordEl = this.page.locator('input[name="password"]');
    this.buttonSubmitEl = this.page.locator('button[type="submit"]');
  }
  async typeUsername(username: string) {
    await this.inputUsernameEl.clear();
    await this.inputUsernameEl.fill(username);
  }

  async typePassword(password: string) {
    await this.inputPasswordEl.clear();
    await this.inputPasswordEl.fill(password);
  }

  async clickLoginButton() {
    await this.buttonSubmitEl.click();
  }

  async login(username: string, password: string) {
    await this.typeUsername(username);
    await this.typePassword(password);
    await this.clickLoginButton();
  }
}
