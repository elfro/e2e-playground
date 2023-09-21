import { HeaderComponent } from '../../components/header.component';
import { Page } from '@playwright/test';

export class DashboardPo {
  private readonly _headerComponent: HeaderComponent;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this._headerComponent = new HeaderComponent(page);
  }

  get headerComponent(): HeaderComponent {
    return this._headerComponent;
  }
}
