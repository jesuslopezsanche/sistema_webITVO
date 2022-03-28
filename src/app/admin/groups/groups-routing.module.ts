import { GroupFormComponent } from './group-form/group-form.component';
import { GroupsComponent } from './groups.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', children:[
    {path:'', component: GroupsComponent},
    {path:'create', component: GroupFormComponent},
    {path:'edit/:id', component: GroupFormComponent},
    {path:'**', redirectTo: '', pathMatch: 'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
