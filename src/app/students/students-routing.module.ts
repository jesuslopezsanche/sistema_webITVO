import { QrComponent } from './qr/qr.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path:'',
  children:[
    {path:'qr',component: QrComponent},
    {path:'**', redirectTo: 'qr', pathMatch: "full"}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
