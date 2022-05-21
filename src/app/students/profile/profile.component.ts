import { CareerService, Career } from './../../services/features/career.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService, Profile } from './../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile | null
  careers: Career[] | null
  profileForm: FormGroup
  constructor(fb: FormBuilder, private authService: AuthService, private careerService: CareerService, private router:Router) {
    this.profileForm = fb.group({
      name: ['', [Validators.required]],
      controlNumber: ['', [Validators.required]],
      career: ['', [Validators.required]],
      semester: ['', [Validators.required]],
    })
    this.profile = null
    this.careers = null
  }

  ngOnInit(): void {
    this.authService.getStudentProfile().subscribe(
      p => {
        this.profile = p
        if (!p) {
          return console.log('new profile');
          
        }
        let { uid,...profile } = p
        console.log(profile);
        
        if (uid) {

          this.profileForm.setValue(
            profile
          )
        }
      }
    )
    this.careerService.getAll().subscribe(careers =>{
      this.careers = careers
        })
  }
  async updateStudentProfile() {
    if (!this.profileForm.valid) {
      return alert('Por favor introduce todos los datos')
    }
    let user = this.authService.user$.subscribe(
      u => {
        let profile = {
          uid: u!.uid,
          name: this.profileForm.get('name')?.value,
          controlNumber: this.profileForm.get('controlNumber')?.value,
          career: this.profileForm.get('career')?.value,
          semester: this.profileForm.get('semester')?.value,
        }
        this.authService.updateStudentProfile(profile)
        if (!this.profile) {
          this.router.navigate(['students'])
          
        }

      }
    )
  }

  closeProfile(){
    this.router.navigate(['students'])

  }

}
