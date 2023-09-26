import { Page } from '@playwright/test';
import { BasePagePo } from '../base-page.po';
import { HeaderComponent } from '../../components/header.component';
export class DashboardPo extends BasePagePo {
  private readonly _headerComponent: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this._headerComponent = new HeaderComponent(page);
  }

  get headerComponent(): HeaderComponent {
    return this._headerComponent;
  }
}
