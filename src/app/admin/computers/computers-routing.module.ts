import { ComputersComponent } from './computers.component';
import { ComputerFormComponent } from './computer-form/computer-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', children:[
    {path:'', component: ComputersComponent},
    {path:'create', component: ComputerFormComponent},
    {path:'edit/:id', component: ComputerFormComponent},
    {path:'**', redirectTo: '', pathMatch: 'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComputersRoutingModule { }
