import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  action = 'Crear'
  form: FormGroup

  constructor(private location: Location, private router : Router, private fb: FormBuilder) {
    this.form = fb.group({
      name:[''],
      status:[true],
    })

   }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['/dashboard/areas'])
  }
  handleSubmit(){

  }

}
