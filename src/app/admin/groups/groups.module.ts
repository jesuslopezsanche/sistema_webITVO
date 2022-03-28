import { GroupService } from './../../services/features/group.service';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupsComponent } from './groups.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupFormComponent } from './group-form/group-form.component';


@NgModule({
  declarations: [
    GroupsComponent,
    GroupFormComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    GroupService
  ]
})
export class GroupsModule { }
