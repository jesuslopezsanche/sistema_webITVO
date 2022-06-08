import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { RealTimeComponent } from './real-time/real-time.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AttendanceComponent,
    RealTimeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AttendanceRoutingModule
  ]
})
export class AttendanceModule { }
