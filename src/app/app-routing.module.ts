import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(e => e.AuthModule)},
  {path: 'students', loadChildren: () => import('./students/students.module').then(e => e.StudentsModule)},
  {path: 'monitor', loadChildren: () => import('./admin/monitor/monitor.module').then(e => e.MonitorModule)},
  {path: 'dashboard', loadChildren: () => import('./admin/admin.module').then(e => e.AdminModule)},
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    paramsInheritanceStrategy: 'always',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
