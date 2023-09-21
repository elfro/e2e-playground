import { Page } from '@playwright/test';

export abstract class BasePagePo {
  private readonly _url: string;
  protected readonly page: Page;

  protected constructor(page: Page, url: string = '/') {
    this.page = page;
    this._url = url;
  }

  async goto() {
    await this.page.goto(this._url);
  }

  get url(): string {
    return this._url;
  }
}
