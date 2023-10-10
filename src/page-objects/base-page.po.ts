import { Page } from '@playwright/test';
import { appURLs } from '../constants/app-urls.const';

export abstract class BasePagePo {
  protected constructor(
    protected readonly page: Page,
    public readonly url: string = '/',
  ) {}

  async goto(subPath?: string, requestURLsToWait?: string[]) {
    const pageURL = subPath ? `${this.url}/${subPath}` : this.url;
    await this.page.goto(pageURL, { waitUntil: 'load' });
    if (requestURLsToWait && requestURLsToWait.length > 0) {
      const requestURLs = [appURLs.api.hiringManagers];
      await this.waitForRequestsAreFinished(requestURLs);
    }
  }

  protected async waitForRequestsAreFinished(urls: string[]) {
    const promiseArray = urls.map(url =>
      this.page.waitForEvent('requestfinished', request => request.url().includes(url)),
    );
    await Promise.all(promiseArray);
  }
}
