import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


@NgModule({
  declarations: [
    MonitorComponent
  ],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    ZXingScannerModule
  ]
})
export class MonitorModule { }
