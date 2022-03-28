import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsComponent } from './materials.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialFormComponent } from './material-form/material-form.component';


@NgModule({
  declarations: [
    MaterialFormComponent,
    MaterialsComponent
  ],
  imports: [
    CommonModule,
    MaterialsRoutingModule,
    ReactiveFormsModule
  ]
})
export class MaterialsModule { }
