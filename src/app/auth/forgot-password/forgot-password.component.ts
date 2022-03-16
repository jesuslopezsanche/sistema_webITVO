import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetPasswordForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]]
      }
    )
  }
  ngOnInit(): void {
  }
  async resetPassword(){
    if (this.resetPasswordForm.invalid) {
      return 
    }
    let res = await this.authService.resetPassword(this.resetPasswordForm.get("email")?.value)
    if (res == undefined) {
      alert('Se ha enviado un link para reestablecer tu contraseña a tu correo')
    }
    
  }

}
