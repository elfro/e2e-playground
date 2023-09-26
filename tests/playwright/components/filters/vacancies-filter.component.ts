import { TableFilterComponent } from './table-filter.component';
import { VacanciesFilterOptions } from '../../types/VacanciesFilterOptions';
import { RecruitmentFilters } from '../../constants/candidates-filters.const';

export class VacanciesFilterComponent extends TableFilterComponent {
  async selectFilters(options: VacanciesFilterOptions) {
    if (Object.keys(options).length === 0) {
      console.log('Exit from selecting filters since the provided options object is empty');
      return;
    }

    if (options.jobTitle) {
      await this.selectOptionFromDropDownList(options.jobTitle, RecruitmentFilters.JOB_TITLE);
    }
    if (options.vacancy) {
      await this.selectOptionFromDropDownList(options.vacancy, RecruitmentFilters.VACANCY);
    }
    if (options.hiringManager) {
      await this.selectOptionFromDropDownList(options.hiringManager, RecruitmentFilters.HIRING_MANAGER);
    }
    if (options.status) {
      await this.selectOptionFromDropDownList(options.status, RecruitmentFilters.STATUS);
    }

    await this.clickOnSubmitButton();
  }
}
