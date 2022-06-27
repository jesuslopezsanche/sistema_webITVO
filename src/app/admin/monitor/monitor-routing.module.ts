import { ExitMonitorGuard } from './../../guards/exit-monitor.guard';
import { MonitorComponent } from './monitor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', canDeactivate:[ExitMonitorGuard], component: MonitorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
