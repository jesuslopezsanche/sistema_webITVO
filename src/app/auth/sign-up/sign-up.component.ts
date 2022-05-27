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
      this.signUpForm.invalid
    )
      return alert('ingresa todos los datos requeridos');
      
      if (password?.value != confirmPassword?.value) {
        return alert('Las contraseñas no coinciden.');
        
      }

    console.log(this.signUpForm.controls);
    let user = {
      email: this.signUpForm.get('email')?.value,
      password: password?.value,
    }

    await this.authService.signUp(user).then(async r => {
      if (r.code == 'auth/email-already-in-use')
      return alert('El email ya está en uso') 
      if (r.code) {
        console.log({r})
        alert('Ocurrió un error en el registro, por favor ponte en contacto con el administrador')
      }
    })


  }

}
