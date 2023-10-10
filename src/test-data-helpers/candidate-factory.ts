import path from 'path';
import { faker } from '@faker-js/faker';
import { ResumeData } from '../types/ui/ResumeData';
import { VacancyAPI } from '../types/api/VacancyAPI';
import { CandidateRequestAPI } from '../types/api/CandidateAPI';

export class CandidateFactory {
  static generateCandidateUIData(): ResumeData {
    const filePath = path.join(__dirname, '../../upload/To-do.pdf');
    return {
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      email: `test${Date.now()}@test.com`,
      contactNumber: faker.string.numeric(10),
      file: filePath,
    };
  }

  static generateCandidateAPIData(vacancy: VacancyAPI): CandidateRequestAPI {
    return {
      dateOfApplication: new Date().toISOString().slice(0, 10),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      middleName: faker.person.middleName(),
      email: `test${Date.now()}@test.com`,
      contactNumber: faker.string.numeric(10),
      vacancyId: vacancy.id,
      consentToKeepData: true,
      comment: null,
      keywords: null,
    };
  }
}
