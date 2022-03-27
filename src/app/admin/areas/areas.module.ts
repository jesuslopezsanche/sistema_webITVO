import { ReactiveFormsModule } from '@angular/forms';
import { AreasComponent } from './areas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasRoutingModule } from './areas-routing.module';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [
    AreasComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    AreasRoutingModule,
    ReactiveFormsModule
  ]
})
export class AreasModule { }
