import { Locator } from '@playwright/test';

export class WebElementHelper {
  static async typeText(inputElement: Locator, text: string) {
    await inputElement.clear();
    await inputElement.fill(text);
  }
}
