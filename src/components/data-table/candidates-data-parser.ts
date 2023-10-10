import { CandidateFilterResultsData } from '../../types/ui/CandidateFilterResultsData';

export class CandidatesDataParser implements IDataTableParser<CandidateFilterResultsData> {
  parse(data: string[]): CandidateFilterResultsData {
    const [vacancy, candidate, hiringManager, dateOfApplication, status] = data;

    return {
      vacancy,
      candidate,
      hiringManager,
      dateOfApplication,
      status,
    };
  }
}
