import { APIRequestContext } from '@playwright/test';
import { ModulesAPI } from '../types/ModulesAPI';
import { LocalizationAPI } from '../types/LocalizationAPI';
import { CandidateResponseAPI } from '../types/CandidateAPI';
import { VacancyAPI, VacancyCreateRequestData } from '../types/VacancyAPI';
import { ApiError } from './api-error';

type options = {
  params?: { [key: string]: string | number | boolean };
};

export class HTTPClient {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getModules() {
    return await this.getEntry<ModulesAPI>('/web/index.php/api/v2/admin/modules');
  }

  async updateModules(modules: ModulesAPI) {
    await this.updateEntry('/web/index.php/api/v2/admin/modules', modules);
  }

  async getLocalization() {
    return await this.getEntry<LocalizationAPI>('/web/index.php/api/v2/admin/localization');
  }

  async updateLocalization(data: LocalizationAPI) {
    await this.updateEntry('/web/index.php/api/v2/admin/localization', data);
  }

  async getJobTitles() {
    return await this.getEntries('/web/index.php/api/v2/admin/job-titles');
  }

  async getUsers() {
    return await this.getEntries('/web/index.php/api/v2/admin/users', {
      params: {
        limit: 50,
        offset: 0,
        sortField: 'u.userName',
        sortOrder: 'ASC',
      },
    });
  }

  async createVacancy(body: VacancyCreateRequestData) {
    return await this.createEntry<VacancyCreateRequestData, VacancyAPI>('/web/index.php/api/v2/recruitment/vacancies', body);
  }

  async deleteVacancy(ids: number[]) {
    return await this.deleteEntries('/web/index.php/api/v2/recruitment/vacancies', ids);
  }

  async deleteCandidate(ids: number[]) {
    return await this.deleteEntries('/web/index.php/api/v2/recruitment/candidates', ids);
  }

  async getCandidatesList() {
    return await this.getEntries<CandidateResponseAPI>('/web/index.php/api/v2/recruitment/candidates', {
      params: {
        limit: 50,
        offset: 0,
        model: 'list',
        sortField: 'candidate.dateOfApplication',
        sortOrder: 'DESC',
      },
    });
  }

  private async getEntry<T>(url: string, options?: options) {
    try {
      const response = await this.request.get(url, options);

      if (!response.ok()) {
        throw new ApiError(response);
      }
      return (
        (await response.json()) as {
          data: T;
        }
      ).data;
    } catch (e) {
      console.log(e);
    }
  }

  private async getEntries<T>(url: string, options?: options) {
    return await this.getEntry<T[]>(url, options);
  }

  private async createEntry<T, K>(url: string, data: T) {
    try {
      const response = await this.request.post(url, { data });

      if (!response.ok()) {
        throw new ApiError(response);
      }

      return (
        (await response.json()) as {
          data: K;
        }
      ).data;
    } catch (e) {
      console.log(e);
    }
  }

  private async updateEntry<T>(url: string, data: T) {
    try {
      const response = await this.request.put(url, { data });

      if (!response.ok()) {
        throw new ApiError(response);
      }

      return response;
    } catch (e) {
      console.log(e);
    }
  }

  private async deleteEntries(url: string, ids: number[]) {
    try {
      const response = await this.request.delete(url, { data: { ids } });

      if (!response.ok()) {
        throw new ApiError(response);
      }

      return response;
    } catch (e) {
      console.log(e);
    }
  }
}
