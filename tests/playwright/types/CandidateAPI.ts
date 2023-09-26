export type CandidateResponseAPI = {
  dateOfApplication: string;
  deletable: boolean;
  firstName: string;
  hasAttachment: boolean;
  id: number;
  lastName: string;
  middleName?: string;
  status: {
    id: number;
    label: string;
  };
  vacancy?: {
    hiringManager?: number;
    id: number;
    name: string;
    status: boolean;
  };
};
