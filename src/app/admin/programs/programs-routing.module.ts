import { ProgramsFormComponent } from './programs-form/programs-form.component';
import { TopProgramsComponent } from './top-programs/top-programs.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramsComponent } from './programs.component';

const routes: Routes = [
  {path: '', children:[
    {path:'', component: ProgramsComponent},
    {path:'top-programs', component: TopProgramsComponent},
    {path:'create', component: ProgramsFormComponent},
    {path:'edit/:id', component: ProgramsFormComponent},
    {path:'**', redirectTo: '', pathMatch: 'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramsRoutingModule { }
