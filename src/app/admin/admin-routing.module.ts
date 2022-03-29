import { AreaNavigationComponent } from './dashboard/area-navigation/area-navigation.component';
import { MaterialsComponent } from './materials/materials.component';
import { CreateSessionComponent } from './sessions/create-session/create-session.component';
import { SessionsComponent } from './sessions/sessions.component';
import { AdminGuard } from './../guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: DashboardComponent,
    children: [
      { path: ':id',
      component: AreaNavigationComponent,
       children: [
        {path: 'inventario', loadChildren: () => import('./materials/materials.module').then(e => e.MaterialsModule)},
        {path: 'top-herramientas', loadChildren: () => import('./materials/materials.module').then(e => e.MaterialsModule)},
        {path: 'mantenimiento', loadChildren: () => import('./materials/materials.module').then(e => e.MaterialsModule)},
        {path: 'asistencia', loadChildren: () => import('./materials/materials.module').then(e => e.MaterialsModule)},
        { path: '**', redirectTo: 'inventario', pathMatch: 'full' },
      ]},
      {
        path: 'groups',
        loadChildren: () => import('./groups/groups.module').then(e => e.GroupsModule)
      },

      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  },
  {
    path: 'areas',
    loadChildren: () => import('./areas/areas.module').then(e => e.AreasModule)

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
