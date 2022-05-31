import { ComputersComponent } from './computers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComputerFormComponent } from './computer-form/computer-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComputersRoutingModule } from './computers-routing.module';


@NgModule({
  declarations: [
    ComputerFormComponent,
    ComputersComponent
  ],
  imports: [
    CommonModule,
    ComputersRoutingModule,
    ReactiveFormsModule
  ]
})
export class ComputersModule { }
