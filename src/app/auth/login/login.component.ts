import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    )
  }



  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      }
    )
  }

  async login() {
    console.log(this.loginForm);
    
    if (this.loginForm.invalid)
      return alert('Debes proveer tu email y contraseña.')

    let user = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }
    let logged = await this.authService.loginEmail(user)
    if (logged?.error) {
      if (logged.error.code == 'auth/wrong-password') {
      }
      
      alert('Verifica tus datos')
      
    }

    if (this.authService.redirectUrl) {
      this.router.navigateByUrl(this.authService.redirectUrl)
    } else {
      this.router.navigate(['auth'])
    }
  }

}
