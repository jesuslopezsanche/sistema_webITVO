import { SessionService } from './../services/session.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { QrComponent } from './qr/qr.component';


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
