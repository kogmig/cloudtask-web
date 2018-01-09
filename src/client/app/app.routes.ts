import { Routes, RouterModule } from '@angular/router';

import { IsLogin, IsGroupOwner } from './services';
import { GroupResolve, UserResolve, SystemConfigResolve } from './resolves';
import {
  RootLayoutPage,
  DashboardPage,
  ActivityPage,
  TaskMonitorPage,
  JobInfoPage,
  JobDetailPage,
  GroupListPage,
  SearchJobPage,
  RuntimeListPage,
  UserListPage,
  LoginPage,
  ServersInfoPage, GroupsLayoutPage,
  JobLogPage,
  UserProfilePage, ChangePasswordPage,
  SystemConfigPage,
  NotFoundPage, UnAuthorizedPage
} from './pages';

let routes: Routes = [
  { path: 'login', component: LoginPage },
  {
    path: '', component: RootLayoutPage, canActivate: [IsLogin], canActivateChild: [IsLogin],
    children: [
      { path: '', component: DashboardPage },
      { path: 'dashboard', redirectTo: '/' },
      { path: 'activity', component: ActivityPage },
      { path: 'activity/:transfer', component: ActivityPage },
      {
        path: 'task', component: GroupsLayoutPage,
        resolve: { groups: GroupResolve },
        children: [
          { path: ':location/:groupId/detail/:jobId/job-log', component: JobLogPage },
          { path: ':location/:groupId/overview', component: TaskMonitorPage },
          { path: ':location/:groupId/new-job', component: JobInfoPage, data: { IsNew: true } },
          { path: ':location/:groupId/detail/:jobId/edit', component: JobInfoPage, data: { IsEdit: true } },
          { path: ':location/:groupId/detail/:jobId/clone', component: JobInfoPage, data: { IsClone: true } },
          { path: ':location/:groupId/import', component: JobInfoPage, data: { IsImport: true } },
          { path: ':location/:groupId/detail/:jobId', component: JobDetailPage, resolve: { groups: GroupResolve } },
        ]
      },
      {
        path: 'group', component: ServersInfoPage, canActivateChild: [IsGroupOwner],
        resolve: { groups: GroupResolve },
      },
      { path: 'search-job', component: SearchJobPage },
      { path: 'manage/runtimes', component: RuntimeListPage, resolve: { groups: GroupResolve } },
      { path: 'manage/groups', component: GroupListPage, resolve: { groups: GroupResolve } },
      { path: 'manage/users', component: UserListPage,  resolve: { users: UserResolve } },
      { path: 'manage/system-config', component: SystemConfigPage },

      { path: 'account/profile', component: UserProfilePage },
      { path: 'account/change-password', component: ChangePasswordPage },

      { path: '401', component: UnAuthorizedPage },
      { path: '404', component: NotFoundPage },
      { path: '**', component: NotFoundPage }
    ]
  }
];

export const AppRouting = RouterModule.forRoot(routes, { useHash: false });