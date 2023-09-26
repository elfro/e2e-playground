import { Page } from '@playwright/test';

export abstract class BasePagePo {
  protected readonly _url: string;
  protected readonly page: Page;

  protected constructor(page: Page, url: string = '/') {
    this.page = page;
    this._url = url;
  }

  async goto(subPath?: string) {
    const pageURL = subPath ? `${this._url}/${subPath}` : this._url;
    await this.page.goto(pageURL, { waitUntil: 'load' });
  }

  get url(): string {
    return this._url;
  }
}
