import { APIRequestContext } from '@playwright/test';
import { ModulesAPI } from '../types/api/ModulesAPI';
import { LocalizationAPI } from '../types/api/LocalizationAPI';
import { CandidateResponseAPI } from '../types/api/CandidateAPI';
import { VacancyAPI, VacancyCreateRequestData } from '../types/api/VacancyAPI';
import { ApiError } from './api-error';
import { JobTitleAPI } from '../types/api/JobTitleAPI';
import { UserAPI } from '../types/api/UserAPI';
import { appURLs } from '../constants/app-urls.const';

type options = {
  params?: { [key: string]: string | number | boolean };
};

export class HTTPClient {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getModules() {
    return await this.getEntry<ModulesAPI>(appURLs.api.modules);
  }

  async updateModules(modules: ModulesAPI) {
    return await this.updateEntry(appURLs.api.modules, modules);
  }

  async getLocalization() {
    return await this.getEntry<LocalizationAPI>(appURLs.api.localization);
  }

  async updateLocalization(data: LocalizationAPI) {
    return await this.updateEntry(appURLs.api.localization, data);
  }

  async getJobTitles() {
    return await this.getEntries<JobTitleAPI>(appURLs.api.jobTitles);
  }

  async getUsers() {
    return await this.getEntries<UserAPI>(appURLs.api.users, {
      params: {
        limit: 50,
        offset: 0,
        sortField: 'u.userName',
        sortOrder: 'ASC',
      },
    });
  }

  async createVacancy(body: VacancyCreateRequestData) {
    return await this.createEntry<VacancyCreateRequestData, VacancyAPI>(appURLs.api.vacancies, body);
  }

  async deleteVacancy(ids: number[]) {
    return await this.deleteEntries(appURLs.api.vacancies, ids);
  }

  async deleteCandidate(ids: number[]) {
    return await this.deleteEntries(appURLs.api.candidates, ids);
  }

  async getCandidatesList() {
    return await this.getEntries<CandidateResponseAPI>(appURLs.api.candidates, {
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
    if (ids.length === 0) {
      console.log('The provided ids array is empty.');
      return;
    }
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
