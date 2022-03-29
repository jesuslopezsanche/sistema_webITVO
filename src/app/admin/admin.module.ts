import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SessionsComponent } from './sessions/sessions.component';
import { MaterialsComponent } from './materials/materials.component';
import { CreateSessionComponent } from './sessions/create-session/create-session.component';
import { AreaListComponent } from './dashboard/area-list/area-list.component';
import { AreaNavigationComponent } from './dashboard/area-navigation/area-navigation.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SessionsComponent,
    CreateSessionComponent,
    AreaListComponent,
    AreaNavigationComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
