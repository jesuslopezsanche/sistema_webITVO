import { GroupsComponent } from './groups/groups.component';
import { MaterialsComponent } from './materials/materials.component';
import { AreasComponent } from './areas/areas.component';
import { CreateSessionComponent } from './sessions/create-session/create-session.component';
import { SessionsComponent } from './sessions/sessions.component';
import { AdminGuard } from './../guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  canActivate: [AdminGuard],
  component: DashboardComponent,
  children: [
    // { path: '', component: DashboardComponent },
    {
      path: 'sessions',
      children: [
        { path: '', component: SessionsComponent },
        { path: 'create-session', component: CreateSessionComponent },
        { path: 'create', component: CreateSessionComponent },
        { path: '**', redirectTo: '', pathMatch: "full" },
      ]
    },
    {
      path: 'areas',
      loadChildren: ()=> import('./areas/areas.module').then(e => e.AreasModule)
      
    },
    {
      path: 'groups',
      children: [
        { path: '', component: GroupsComponent },
        { path: '**', redirectTo: '', pathMatch: "full" },
      ]
    },
    {
      path: 'materials',
      children: [
        { path: '', component: MaterialsComponent },
        { path: '**', redirectTo: '', pathMatch: "full" },
      ]
    },
    { path: '**', redirectTo: 'sessions/index', pathMatch: 'full' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
