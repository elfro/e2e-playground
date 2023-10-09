# e2e-playground
This project is a playground to practice e2e tests.

The [OrangeHRM](https://opensource-demo.orangehrmlive.com/) demo project was chosen since it provides guest user pages, admin panel and allows to use API request to setup necessary test environment.

**Test Report** is deployed to [GH pages](https://elfro.github.io/e2e-playground).

## Setup Pre-Requisites

Node.js v.18.17.0 +

npm 9.6.0 +

## Installation
1. Clone a project locally and switch to the project directory:
```bash
git clone git@github.com:elfro/e2e-playground.git && cd e2e-playground
```
3. Install packages:
```bash
npm ci
```
4. Install browsers
```bash
npx playwright install
```
5. Copy .env.example file to the root of the project with .env file name.
```bash
cp .env.example .env
```
6. Set `USERNAME` and `PASSWORD` values by copying them from the main auth page of [OrangeHRM](https://opensource-demo.orangehrmlive.com/) app.

<img src="docs/assets/env_auth_creds_variable.png" alt="Auth credentials" style="width: 50% !important;">

7. Run tests:
```bash
npm run test
```
or in UI mode:
```bash
npm run test:pw-ui
```
8. View Test Report:
```bash
npm run allure:open
```

___
## Tech Stack
- Programming language: [<img alt="programming language" src="docs/assets/ts-logo-128.svg" title="TypeScript" width="30px"/>](https://www.typescriptlang.org)
- Test library: [<img alt="test library" src="docs/assets/playwright-logo.svg" title="Playwright" width="30px"/>](https://playwright.dev/)
- Test Reporter: [<img alt="test reporter" src="docs/assets/allure-logo.png" title="Allure" width="30px"/>](https://github.com/allure-framework/allure-js/blob/master/packages/allure-playwright/README.md)
- To generate test data: [<img alt="library to generate test data" src="docs/assets/fakerjs-logo.svg" title="Fakerjs" width="30px"/>](https://fakerjs.dev/)
- To check code syntax and style: [<img alt="static code analysis tool" src="docs/assets/eslint-logo-color.svg" title="ESLint" width="60px"/>](https://eslint.org/), [<img alt="code formatter" src="docs/assets/prettier-logo.svg" title="Prettier" width="30px"/>](https://prettier.io/)
- CI: [<img alt="CI/CD" src="docs/assets/gh-actions-logo.png" title="GitHub Actions" width="30px"/>](https://docs.github.com/en/actions)

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
   
   [video.webm](https://github.com/elfro/e2e-playground/assets/8956849/3a4aa1a6-cfe6-4cf8-9dee-64c1d30e85d6)
   
   [video.webm](https://github.com/elfro/e2e-playground/assets/8956849/259d4153-976d-42da-97ff-b19642b6187a)
   
3. Filters work properly on Candidates page
   
   [video.webm](https://github.com/elfro/e2e-playground/assets/8956849/486e1145-8b59-4da7-b8cb-b06b426916ff)
   
5. The newly applied candidate from Apply Vacancy page appears on the Candidates page.
   
   [video.webm](https://github.com/elfro/e2e-playground/assets/8956849/6a632e4a-7c54-4cf4-a256-49a21ed09591)
   
