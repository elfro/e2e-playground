import { Page } from '@playwright/test';
import { appURLs } from '../constants/app-urls.const';

export abstract class BasePagePo {
  protected readonly _url: string;
  protected readonly page: Page;

  protected constructor(page: Page, url: string = '/') {
    this.page = page;
    this._url = url;
  }

  async goto(subPath?: string, requestURLsToWait?: string[]) {
    const pageURL = subPath ? `${this._url}/${subPath}` : this._url;
    await this.page.goto(pageURL, { waitUntil: 'load' });
    if (requestURLsToWait && requestURLsToWait.length > 0) {
      const requestURLs = [appURLs.api.hiringManagers];
      await this.waitForRequestsAreFinished(requestURLs);
    }
  }

  get url(): string {
    return this._url;
  }

  protected async waitForRequestsAreFinished(urls: string[]) {
    const promiseArray = urls.map(async url => {
      await this.page.waitForEvent('requestfinished', request => request.url().includes(url));
    });
    await Promise.all(promiseArray);
  }
}
