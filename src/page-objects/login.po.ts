import { Page } from '@playwright/test';
import { BasePagePo } from './base-page.po';
import { LoginFormComponent } from '../components/login-form.component';

export class LoginPo extends BasePagePo {
  private readonly _loginFormComponent: LoginFormComponent;

  constructor(page: Page) {
    super(page);
    this._loginFormComponent = new LoginFormComponent(this.page);
  }

  get loginFormComponent(): LoginFormComponent {
    return this._loginFormComponent;
  }
}
