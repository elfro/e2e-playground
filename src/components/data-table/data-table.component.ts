import { expect, Locator, Page } from '@playwright/test';
import { BaseComponent } from '../base.component';

export class DataTableComponent<T> extends BaseComponent {
  private readonly preloaderEl: Locator;
  private readonly tableRowEl: Locator;
  private readonly tableCellSelector: string;
  private readonly buttonViewSelector: string;
  private readonly buttonDeleteSelector: string;
  private readonly buttonDownloadSelector: string;
  private readonly buttonEditSelector: string;

  constructor(
    page: Page,
    private readonly parser: IDataTableParser<T>,
  ) {
    super(page);
    this.preloaderEl = this.page.locator('.oxd-loading-spinner');
    this.tableRowEl = this.page.locator('.oxd-table-card');
    this.tableCellSelector = '.oxd-table-cell div:not([class])';
    this.buttonViewSelector = '.bi-eye-fill';
    this.buttonDeleteSelector = '.bi-trash';
    this.buttonDownloadSelector = '.bi-download';
    this.buttonEditSelector = '.bi-pencil-fill';
  }

  async collectTableData() {
    const results: T[] = [];
    await this.tableRowEl.first().scrollIntoViewIfNeeded();
    for (const row of await this.tableRowEl.all()) {
      const values = await row.locator(this.tableCellSelector).allInnerTexts();
      const t: T = this.parser.parse(values);
      results.push(t);
    }

    return results;
  }

  async waitForPreloaderDisappear() {
    await this.preloaderEl.waitFor({ state: 'detached' });
    await expect(this.preloaderEl).toHaveCount(0);
  }
}
