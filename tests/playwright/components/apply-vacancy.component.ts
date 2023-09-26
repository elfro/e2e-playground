import { Locator, Page } from '@playwright/test';
import { BaseComponent } from './base.component';
import { ResumeData } from '../types/ui/ResumeData';
import { WebElementHelper } from '../WebElementHelper';

export class ApplyVacancyComponent extends BaseComponent {
  private readonly inputFirstNameEl: Locator;
  private readonly inputMiddleNameEl: Locator;
  private readonly inputLastNameEl: Locator;
  private readonly inputEmailEl: Locator;
  private readonly inputContactNumberEl: Locator;
  private readonly buttonSubmit: Locator;
  private readonly inputUploadResumeSelector: string;

  constructor(page: Page) {
    super(page);
    this.inputFirstNameEl = this.page.locator('[name="firstName"]');
    this.inputMiddleNameEl = this.page.locator('[name="middleName"]');
    this.inputLastNameEl = this.page.locator('[name="lastName"]');
    this.inputEmailEl = this.page.locator('[name="email"]');
    this.inputContactNumberEl = this.page.locator('[name="contactNumber"]');
    this.buttonSubmit = this.page.locator('button[type="submit"]');
    this.inputUploadResumeSelector = '[name="resume"]';
  }

  async fillInForm(resumeData: ResumeData) {
    const { firstName, lastName, middleName, email, contactNumber, file } = resumeData;
    await this.typeFirstName(firstName);
    await this.typeMiddleName(middleName);
    await this.typeLastName(lastName);
    await this.typeEmail(email);
    await this.typeContactNumber(contactNumber);
    await this.uploadResume(file);
    await this.clickSubmitButton();
  }

  async typeFirstName(firstName: string) {
    await WebElementHelper.typeText(this.inputFirstNameEl, firstName);
  }

  async typeMiddleName(middleName: string) {
    await WebElementHelper.typeText(this.inputMiddleNameEl, middleName);
  }

  async typeLastName(lastName: string) {
    await WebElementHelper.typeText(this.inputLastNameEl, lastName);
  }

  async typeEmail(email: string) {
    await WebElementHelper.typeText(this.inputEmailEl, email);
  }

  async typeContactNumber(contactNumber: string) {
    await WebElementHelper.typeText(this.inputContactNumberEl, contactNumber);
  }

  async uploadResume(file: string) {
    await this.page.setInputFiles(this.inputUploadResumeSelector, file);
  }

  async clickSubmitButton() {
    await this.buttonSubmit.click();
  }
}
