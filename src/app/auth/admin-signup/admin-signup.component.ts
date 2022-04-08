import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {
  signUpForm: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router : Router) {
    this.signUpForm = fb.group({
      name:['', [Validators.required]],
      area:['', [Validators.required]],
      email:['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@voaxaca.tecnm.mx$')]],
      password:['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm:['', [Validators.required, Validators.minLength(6)]]
    })
   }

  ngOnInit(): void {
  }
  register() {

    let password = this.signUpForm.get('password')!
    let confirmPassword = this.signUpForm.get('passwordConfirm')

    if (this.signUpForm.get('email')?.hasError('pattern')) {
      return alert('Email inválido, asegúrate de usar tu correo institucional')
      
    }
    if (password?.value == "" ||
      (password?.value != confirmPassword?.value) ||
      this.signUpForm.invalid
    )
      return alert('ingresa todos los datos requeridos');

    console.log(this.signUpForm.controls);
    let user = {
      name: this.signUpForm.get('name')?.value,
      area: this.signUpForm.get('area')?.value,
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
