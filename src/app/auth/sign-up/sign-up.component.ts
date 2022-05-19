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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signUpForm = fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@voaxaca.tecnm.mx$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }
  async register() {

    let password = this.signUpForm.get('password')!
    let confirmPassword = this.signUpForm.get('passwordConfirm')
    console.log(this.signUpForm.get('email'));
    
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
      email: this.signUpForm.get('email')?.value,
      password: password?.value,
    }

    await this.authService.signUp(user).then(async r => {
      if (r) {
        console.log({r});
        let logged = await this.authService.loginEmail(user)
        if (logged?.error) {
          if (logged.error.code == 'auth/wrong-password') {
            alert('Verifica tus datos')
          }

        }

        // if (this.authService.redirectUrl) {
        //   this.router.navigateByUrl(this.authService.redirectUrl)
        // } else {
        //   this.router.navigate(['auth'])
        // }

        // this.router.navigateByUrl('auth/login')
      }
      else {
        alert('Ocurrió un error en el registro, por favor ponte en contacto con el administrador')
      }
    })


  }

}
