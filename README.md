# e2e-playground
This project is a playground to practice e2e tests.

The [OrangeHRM](https://opensource-demo.orangehrmlive.com/) demo project was chosen since it provides guest user pages, admin panel and allows to use API request to setup necessary test environment.

**Test Report** is deployed to [GH pages](https://elfro.github.io/e2e-playground).

## Setup Pre-Requisites

Node.js v.18.17.0 +

npm 9.6.0 +

## Installation
1. Clone a project locally:
```
git@github.com:elfro/e2e-playground.git
```
2. Switch to the project directory:
```
cd e2e-playground
```
3. Install packages:
```
npm ci
```
4. Install browsers
```
npx playwright install
```
5. Copy .env.example file to the root of the project with .env file name.
6. Set `USERNAME` and `PASSWORD` values by copying them from the main auth page of [OrangeHRM](https://opensource-demo.orangehrmlive.com/) app.

<img src="docs/assets/env_auth_creds_variable.png" alt="Auth credentials" style="width: 50% !important;">

7. Run tests:
```
npm run test:pw
```
or in UI mode:
```
npm run test:pw-ui
```
8. View Test Report:
```
npm run allure:open
```

___
## Tech Stack
- Programming language: [TypeScript](https://www.typescriptlang.org/); 
- Test library: [Playwright](https://playwright.dev/);
- Test Reporter: [Allure](https://github.com/allure-framework/allure-js/blob/master/packages/allure-playwright/README.md);
- To generate test data: [Faker](https://fakerjs.dev/);
- To check code syntax and style: [ESLint](https://eslint.org/), [Prettier](https://prettier.io/);
- CI: [GitHub Actions](https://docs.github.com/en/actions).

___

## Project Structure
### <a name="terminology"></a> Terminology

**Spec** file contains the test itself.

**Fixture**, **Setup** files contain the project dependencies that are used to prepare environment for each test.

**Component** class usually contains all element selectors and methods to interact with those elements inside this component.

**Page** class consists of Components and may contain a method for page action that requires the work with several components.

**Client** provides the API with the specific library / service that can be used in the tests.

**Helper** does general tasks that could be useful in different places. The most common representatives are:
- WebElementHelper: basic Element actions are defined here;

**Data Factory** generates necessary test data of the specific type. 

**Type** file represents the common object type that can be met in the project, like API response data or the UI data.

**Constants**, **Enum** use to represent the single or group of constants.

___

The following test cases are covered:
1. Filters work properly on Vacancies page
2. Filters work properly on Candidates page
3. The newly applied candidate appears on the Candidates page.