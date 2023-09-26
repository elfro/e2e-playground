import { TableFilterComponent } from './table-filter.component';
import { CandidatesFilterOptions } from '../../types/ui/CandidatesFilterOptions';
import { RecruitmentFilters } from '../../constants/candidates-filters.const';

export class CandidatesFilterComponent extends TableFilterComponent {
  async selectFilters(options: CandidatesFilterOptions) {
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
    if (options.methodOfApplication) {
      await this.selectOptionFromDropDownList(options.methodOfApplication, RecruitmentFilters.METHOD_OF_APPLICATION);
    }
    if (options.candidateName) {
      await this.typeTextToInputFieldWithAutoComplete(options.candidateName, RecruitmentFilters.CANDIDATE_NAME);
    }
    if (options.keywords) {
      await this.typeTextToInputField(options.keywords.join(', '), RecruitmentFilters.KEYWORDS);
    }
    if (options.dateOfApplicationFrom) {
      await this.typeTextToInputField(options.dateOfApplicationFrom, RecruitmentFilters.DATE_OF_APPLICATION_FROM);
    }

    // ToDo: fix
    if (options.dateOfApplicationTo) {
      await this.typeTextToInputField(options.dateOfApplicationTo, RecruitmentFilters.DATE_OF_APPLICATION_TO);
    }
    if (options.methodOfApplication) {
      await this.selectOptionFromDropDownList(options.methodOfApplication, RecruitmentFilters.METHOD_OF_APPLICATION);
    }

    await this.clickOnSubmitButton();
  }
}
