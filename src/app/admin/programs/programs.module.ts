import { ReactiveFormsModule } from '@angular/forms';
import { ProgramsComponent } from './programs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramsRoutingModule } from './programs-routing.module';
import { ProgramsFormComponent } from './programs-form/programs-form.component';
import { TopProgramsComponent } from './top-programs/top-programs.component';


@NgModule({
  declarations: [
    ProgramsFormComponent,
    ProgramsComponent,
    TopProgramsComponent
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProgramsModule { }
