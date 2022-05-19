import { AttendanceHistoryComponent } from './attendance-history/attendance-history.component';
import { NewAttendanceComponent } from './new-attendance/new-attendance.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './../guards/auth.guard';
import { QrComponent } from './qr/qr.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{
  path:'',
  canActivate:[AuthGuard],
  children:[
    {path:'home',component: HomeComponent},
    {path:'new-session', component: NewAttendanceComponent},
    {path:'qr',component: QrComponent},
    {path:'history',component: AttendanceHistoryComponent},
    {path:'profile',component: ProfileComponent},
    {path:'**', redirectTo: 'home', pathMatch: "full"}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
