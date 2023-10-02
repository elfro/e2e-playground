import path from 'path';
import { ResumeData } from '../types/ui/ResumeData';
import { faker } from '@faker-js/faker';

export class CandidateFactory {
  static generateCandidateUIData() {
    const filePath = path.join(__dirname, '../../upload/To-do.pdf');
    const candidate: ResumeData = {
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      email: `test${Date.now()}@test.com`,
      contactNumber: faker.string.numeric(10),
      file: filePath,
    };

    return candidate;
  }
}
