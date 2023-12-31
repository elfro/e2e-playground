export type JobTitleAPI = {
  id: number;
  title: string;
  description: string;
  note: string;
  jobSpecification?: {
    id?: number;
    filename?: string;
    fileType?: string;
    fileSize?: number;
  };
  isDeleted?: boolean;
};
