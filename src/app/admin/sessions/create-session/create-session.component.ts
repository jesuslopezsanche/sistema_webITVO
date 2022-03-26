import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {
  sessionForm: FormGroup
  constructor(private fb : FormBuilder) {
    this.sessionForm = fb.group({
      date:[Date.now(),Validators.required],
      group:["",Validators.required],
      area:["",Validators.required],
      startTime:["",Validators.required],
      endTime:["",Validators.required],
    })
    console.log(this.sessionForm);
    
   }

  ngOnInit(): void {
  }

  createSession(){

  }
}
