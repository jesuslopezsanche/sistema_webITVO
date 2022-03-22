import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SessionsComponent } from './sessions/sessions.component';
import { AreasComponent } from './areas/areas.component';
import { MaterialsComponent } from './materials/materials.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SessionsComponent,
    AreasComponent,
    MaterialsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
