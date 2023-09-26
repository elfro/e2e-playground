import { Locator, Page } from '@playwright/test';
import { BaseComponent } from '../base.component';
import { WebElementHelper } from '../../WebElementHelper';

export abstract class TableFilterComponent extends BaseComponent {
  private readonly buttonSearchEl: Locator;
  private readonly inputGroupEl: Locator;
  private readonly inputGroupLabelSelector: string;
  private readonly inputSelectSelector: string;
  private readonly selectOptionSelector: string;
  private readonly inputFieldSelector: string;

  constructor(page: Page) {
    super(page);
    this.buttonSearchEl = this.page.locator('[type="submit"]');
    this.inputGroupEl = this.page.locator('.oxd-input-group');
    this.inputGroupLabelSelector = '.oxd-label';
    this.inputSelectSelector = '.oxd-select-text-input';
    this.selectOptionSelector = '[role="option"]';
    this.inputFieldSelector = 'input';
  }

  abstract selectFilters<T>(options: T): Promise<void>;

  protected async selectOptionFromDropDownList(optionToSelect: string, groupLabel: string) {
    const mainGroupElement = this.findGroupByLabelName(groupLabel);
    await mainGroupElement.locator(this.inputSelectSelector).click();
    await this.page.waitForLoadState();
    await mainGroupElement.locator(this.selectOptionSelector, { hasText: optionToSelect }).click();
  }

  protected async typeTextToInputField(text: string, groupLabel: string) {
    const mainGroupElement = this.findGroupByLabelName(groupLabel);
    const inputElement = mainGroupElement.locator(this.inputFieldSelector);
    await WebElementHelper.typeText(inputElement, text);

    return mainGroupElement;
  }

  protected async typeTextToInputFieldWithAutoComplete(text: string, groupLabel: string) {
    const mainGroupElement = await this.typeTextToInputField(text, groupLabel);
    await mainGroupElement.locator(this.selectOptionSelector, { hasText: text }).click();
  }

  protected async clickOnSubmitButton() {
    await this.buttonSearchEl.click();
  }

  private findGroupByLabelName(labelName: string) {
    return this.inputGroupEl.filter({
      has: this.page.locator(this.inputGroupLabelSelector, {
        hasText: labelName,
      }),
    });
  }
}
