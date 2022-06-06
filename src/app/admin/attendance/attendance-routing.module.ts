import { RealTimeComponent } from './real-time/real-time.component';
import { AttendanceComponent } from './attendance.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', children:[
    {path:'', component: AttendanceComponent},
    {path:'real-time', component: RealTimeComponent},
    {path:'**', redirectTo: '', pathMatch: 'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
