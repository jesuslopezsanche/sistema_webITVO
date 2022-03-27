import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router : Router) {
    this.signUpForm = fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm:['', [Validators.required, Validators.minLength(6)]]
    })
   }

  ngOnInit(): void {
  }
  register() {

    let password = this.signUpForm.get('password')!
    let confirmPassword = this.signUpForm.get('passwordConfirm')


    if (password?.value == "" ||
      (password?.value != confirmPassword?.value) ||
      this.signUpForm.invalid
    )
      return alert('datos pls');

    console.log(this.signUpForm.controls);
    let user = {
      email: this.signUpForm.get('email')?.value,
      password: password?.value,
    }
    this.authService.signUp(user).then(r =>{
      if (r) {
        console.log(r);
        
        this.router.navigateByUrl('auth/login')
      }
      else{
        alert()
      }
    })
    

  }

}
