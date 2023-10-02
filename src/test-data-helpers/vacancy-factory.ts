import { JobTitleAPI } from '../types/api/JobTitleAPI';
import { UserAPI } from '../types/api/UserAPI';

export class VacancyFactory {
  static generateVacancyAPIData(jobTitle: JobTitleAPI, hiringManager: UserAPI) {
    return {
      name: `Middle ${jobTitle.title} ${Date.now()}`,
      jobTitleId: jobTitle.id,
      employeeId: hiringManager.employee.empNumber,
      numOfPositions: 1,
      description: `We're looking for ${jobTitle.title}`,
      status: true,
      isPublished: true,
    };
  }
}
