import { VacanciesFilterResultsData } from '../../types/ui/VacanciesFilterResultsData';

export class VacanciesDataParser implements IDataTableParser<VacanciesFilterResultsData> {
  parse(data: string[]): VacanciesFilterResultsData {
    const [vacancy, jobTitle, hiringManager, status] = data;

    return {
      vacancy,
      jobTitle,
      hiringManager,
      status,
    };
  }
}
