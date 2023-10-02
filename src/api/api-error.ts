import { APIResponse } from '@playwright/test';

export class ApiError extends Error {
  constructor(response: APIResponse) {
    super();
    this.message = `An error has occurred: ${response.status()}, ${response.statusText()}, \n${response.url()}`;
  }
}
