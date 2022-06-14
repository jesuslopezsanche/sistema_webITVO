import { ProgramService } from './../../../services/features/program.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-top-programs',
  templateUrl: './top-programs.component.html',
  styleUrls: ['./top-programs.component.css']
})
export class TopProgramsComponent implements OnInit {
  form: FormGroup
  tabledata = []
  constructor(private programService:ProgramService, private fb:FormBuilder) { 
    this.form = this.fb.group({
      range: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    

    this.programService.getTop('Diario').subscribe( (...r) =>{
      console.log({top: r});
      
    }

    )
  }

}
