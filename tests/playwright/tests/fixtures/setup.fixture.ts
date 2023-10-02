import { test as base } from '@playwright/test';
import { HTTPClient } from '../../api/http-client';
import { locale } from '../../constants/locale.const';

export const test = base.extend<{ httpClient: HTTPClient }>({
  httpClient: async ({ request }, use) => {
    const client = new HTTPClient(request);

    const initialLocale = await client.getLocalization();
    await client.updateLocalization(locale);

    await use(client);

    await client.updateLocalization(initialLocale);
  },
});

export { expect } from '@playwright/test';
