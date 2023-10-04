export type CandidateResponseAPI = {
  dateOfApplication: string;
  deletable: boolean;
  firstName: string;
  hasAttachment: boolean;
  id: number;
  lastName: string;
  middleName?: string | null;
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

export type CandidateRequestAPI = {
  dateOfApplication: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  contactNumber: string | null;
  vacancyId: number;
  consentToKeepData: boolean;
  comment: string | null;
  keywords: string | null;
};
