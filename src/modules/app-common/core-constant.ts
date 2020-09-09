import {environment} from '../../environments/environment';

export const CoreConstant = {

  API_ENDPOINT: environment.apiUrl,
  API_SECURED_ENDPOINT: environment.apiUrl + '/rest',
  API_RESOURCE_DOWNLOAD: environment.apiUrl + '/rest/download',

  Success_Action: 'Action Success',
  Operation_Failed_MSG: 'Oops! Something went wrong !!',

  errorCode: {
    ServerDown: 0,
    BadRequest: 400,
    Unauthorized: 401,
    ResourceNotFound: 404,
    InternalServerError: 500,
  },

  APP_ROUTES: {
    DASHBOARD: '/dashboard',

    USER: '/dashboard/user',
    USER_VIEW_LIST: '/dashboard/user/view',
    USER_DETAILS: '/dashboard/user/view',
    USER_CREATE: '/dashboard/user/add',

    TASK: '/dashboard/task',
    TASK_VIEW_LIST: '/dashboard/task/view',
    TASK_DETAILS: '/dashboard/task/view',
    TASK_CREATE: '/dashboard/task/add',

    MY_BOARD: '/dashboard/board',
  }
};
