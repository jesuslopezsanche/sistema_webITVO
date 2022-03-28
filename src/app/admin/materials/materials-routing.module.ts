import { MaterialFormComponent } from './material-form/material-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialsComponent } from './materials.component';

const routes: Routes = [
  {path: '', children:[
    {path:'', component: MaterialsComponent},
    {path:'create', component: MaterialFormComponent},
    {path:'edit/:id', component: MaterialFormComponent},
    {path:'**', redirectTo: '', pathMatch: 'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialsRoutingModule { }
