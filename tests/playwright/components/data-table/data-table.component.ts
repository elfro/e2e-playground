import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from '../base.component';

export abstract class DataTableComponent<T> extends BaseComponent {
  private readonly preloaderEl: Locator;
  private readonly tableRowEl: Locator;
  private readonly tableCellSelector: string;
  private readonly buttonViewSelector: string;
  private readonly buttonDeleteSelector: string;
  private readonly buttonDownloadSelector: string;
  private readonly buttonEditSelector: string;

  protected constructor(page: Page) {
    super(page);
    this.preloaderEl = page.locator('.oxd-loading-spinner');
    this.tableRowEl = page.locator('.oxd-table-card');
    this.tableCellSelector = '.oxd-table-cell div:not([class])';
    this.buttonViewSelector = '.bi-eye-fill';
    this.buttonDeleteSelector = '.bi-trash';
    this.buttonDownloadSelector = '.bi-download';
    this.buttonEditSelector = '.bi-pencil-fill';
  }

  protected abstract dataParser<T>(data: string[]): T;

  async collectData() {
    const results: T[] = [];
    for (const row of await this.tableRowEl.all()) {
      const values = await row.locator(this.tableCellSelector).allInnerTexts();
      const t: T = this.dataParser(values);
      results.push(t);
    }

    return results;
  }

  async waitForPreloaderDisappear() {
    await this.preloaderEl.waitFor({ state: 'detached' });
    await expect(this.preloaderEl).toHaveCount(0);
  }
}
