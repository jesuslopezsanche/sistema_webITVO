import { ReportComponent } from './report/report.component';
import { FormComponent } from './form/form.component';
import { AreasComponent } from './areas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', children:[
    {path:'', component: AreasComponent},
    {path:'create', component: FormComponent},
    {path:'edit/:id', component: FormComponent},
    {path:'reports', component: ReportComponent},
    {path:'**', redirectTo: '', pathMatch: 'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreasRoutingModule { }
