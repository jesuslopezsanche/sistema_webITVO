import { ChartistModule } from 'ng-chartist';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AreasComponent } from './areas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasRoutingModule } from './areas-routing.module';
import { FormComponent } from './form/form.component';
import { ReportComponent } from './report/report.component';


@NgModule({
  declarations: [
    AreasComponent,
    FormComponent,
    ReportComponent
  ],
  imports: [
    CommonModule,
    AreasRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ChartistModule
  ]
})
export class AreasModule { }
