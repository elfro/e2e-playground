import { JobTitleAPI } from './JobTitleAPI';

export type VacancyAPI = {
  id: number;
  name: string;
  description: string;
  numOfPositions: number;
  status: boolean;
  isPublished: boolean;
  jobTitle: JobTitleAPI;
  hiringManager: {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    terminationId?: number | string;
  };
};

export type VacancyCreateRequestData = {
  name: string;
  jobTitleId: number;
  employeeId: number;
  numOfPositions: number;
  description: string;
  status: boolean;
  isPublished: boolean;
};
