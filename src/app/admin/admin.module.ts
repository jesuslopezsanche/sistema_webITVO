import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SessionsComponent } from './sessions/sessions.component';
import { MaterialsComponent } from './materials/materials.component';
import { CreateSessionComponent } from './sessions/create-session/create-session.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SessionsComponent,
    CreateSessionComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
