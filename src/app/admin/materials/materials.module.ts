import { ChartistModule } from 'ng-chartist';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsComponent } from './materials.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsRoutingModule } from './materials-routing.module';
import { MaterialFormComponent } from './material-form/material-form.component';
import { TopMaterialsComponent } from './top-materials/top-materials.component';


@NgModule({
  declarations: [
    MaterialFormComponent,
    MaterialsComponent,
    TopMaterialsComponent
  ],
  imports: [
    CommonModule,
    MaterialsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ChartistModule
  ]
})
export class MaterialsModule { }
