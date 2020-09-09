import {SideNavGroups, SideNavGroupItems} from './nav-model';
import {CoreConstant} from '../app-common/core-constant';

const API_ROUTES = CoreConstant.APP_ROUTES;

export const sideNavGroups: SideNavGroups[] = [
  {
    text: ' ',
    items: ['dashboard'],
  },
  {
    text: 'FEATURES',
    items: ['users', 'tasks'],
  },
  {
      text: 'MY BOARD',
      items: ['myBoard'],
  },
];

export const sideNavItems: SideNavGroupItems = {
  dashboard: {
    icon: 'tachometer-alt',
    text: 'Dashboard',
    link: API_ROUTES.DASHBOARD,
  },
  users: {
    icon: 'table',
    text: 'Users',
    link: API_ROUTES.USER,
    submenu: [
      {
        text: 'View User',
        link: API_ROUTES.USER_VIEW_LIST,
      },
      {
        text: 'Add User',
        link: API_ROUTES.USER_CREATE,
        requiredAdminAccess: true
      },
    ],
  },
  tasks: {
    icon: 'table',
    text: 'Tasks',
    link: API_ROUTES.TASK,
    submenu: [
      {
        text: 'View',
        link: API_ROUTES.TASK_VIEW_LIST,
      },
      {
        text: 'Add Task',
        link: API_ROUTES.TASK_CREATE,
        requiredAdminAccess: true
      },
    ],
    requiredAdminAccess: true
  },
  myBoard: {
    icon: 'tachometer-alt',
    text: 'My Board',
    link: API_ROUTES.MY_BOARD,
  },
  // usersView: {
  //   icon: 'table',
  //   text: 'Users View',
  //   link: '/dashboard/user/view',
  // },
  // usersAdd: {
  //   icon: 'book-open',
  //   text: 'Add User',
  //   link: '/dashboard/user/add',
  //   requiredAdminAccess: true
  // },
  // tasksView: {
  //   icon: 'table',
  //   text: 'Tasks View',
  //   link: '/dashboard/task/view',
  // },
  // tasksAdd: {
  //   icon: 'book-open',
  //   text: 'Add Tasks',
  //   link: '/dashboard/task/add',
  //   requiredAdminAccess: true
  // }
  // mymenu: {
  //     icon: 'menu-icon',
  //     text: 'MenuText',
  //     link: '/dashboard/mymenu',
  // },
};
