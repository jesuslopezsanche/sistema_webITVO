import { ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { QrComponent } from './qr/qr.component';
import { AttendanceService } from '../services/features/attendance.service';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NewAttendanceComponent } from './new-attendance/new-attendance.component';
import { AttendanceHistoryComponent } from './attendance-history/attendance-history.component';


@NgModule({
  declarations: [
    QrComponent,
    ProfileComponent,
    HomeComponent,
    NewAttendanceComponent,
    AttendanceHistoryComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    QRCodeModule,
    ReactiveFormsModule
  ],
  providers:[
    AttendanceService,
    TitleCasePipe
  ]
})
export class StudentsModule { }
