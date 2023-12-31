import { expect, test as setup } from './fixtures/httpclient.fixture';
import { STORAGE_STATE } from '../playwright.config';
import { LoginPo } from '../src/page-objects/login.po';
import { DashboardPo } from '../src/page-objects/admin/dashboard.po';

setup('should login as an admin', async ({ page }) => {
  const loginPage = new LoginPo(page);
  const dashboardPage = new DashboardPo(page);
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  await loginPage.goto();
  await loginPage.login(username, password);

  await expect(dashboardPage.headerComponent.getUserDropDownMenu()).toBeVisible();
  await page.context().storageState({ path: STORAGE_STATE });
});
