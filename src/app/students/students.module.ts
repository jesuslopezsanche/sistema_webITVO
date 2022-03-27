import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { QrComponent } from './qr/qr.component';
import { SessionService } from '../services/features/session.service';


@NgModule({
  declarations: [
    QrComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule
  ],
  providers:[
    SessionService
  ]
})
export class StudentsModule { }
