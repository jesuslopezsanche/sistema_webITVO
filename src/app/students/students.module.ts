import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { QrComponent } from './qr/qr.component';
import { AttendanceService } from '../services/features/attendance.service';


@NgModule({
  declarations: [
    QrComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule
  ],
  providers:[
    AttendanceService
  ]
})
export class StudentsModule { }
