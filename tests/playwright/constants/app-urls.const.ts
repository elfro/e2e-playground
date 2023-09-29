export const appURLs = {
  api: {
    modules: '/web/index.php/api/v2/admin/modules',
    localization: '/web/index.php/api/v2/admin/localization',
    jobTitles: '/web/index.php/api/v2/admin/job-titles',
    users: '/web/index.php/api/v2/admin/users',
    vacancies: '/web/index.php/api/v2/recruitment/vacancies',
    candidates: '/web/index.php/api/v2/recruitment/candidates',
    candidateStatuses: '/web/index.php/api/v2/recruitment/candidates/statuses',
    hiringManagers: '/web/index.php/api/v2/recruitment/hiring-managers',
    leaveWorkweek: '/web/index.php/api/v2/leave/workweek',
    leaveHolidays: '/web/index.php/api/v2/leave/holidays',
  },
  pages: {
    recruitment: {
      candidates: '/web/index.php/recruitment/viewCandidates',
      vacancies: '/web/index.php/recruitment/viewJobVacancy',
    },
    applyVacancy: '/web/index.php/recruitmentApply/applyVacancy/id',
  },
};
