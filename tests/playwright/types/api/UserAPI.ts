export type UserAPI = {
  deleted: boolean;
  employee: {
    empNumber: number;
    employeeId: string;
    firstName: string;
    lastName: string;
    middleName: string;
    terminationId?: number | string;
  };
  id: number;
  status: boolean;
  userName: string;
  userRole: {
    displayName: string;
    id: number;
    name: string;
  };
};
