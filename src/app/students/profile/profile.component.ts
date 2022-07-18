import { CareerService, Career } from './../../services/features/career.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService, Profile } from './../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile | null
  careers: Career[] | null
  profileForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private titleCasePipe:TitleCasePipe,
    private authService: AuthService,
    private careerService: CareerService,
    private router: Router) {
    this.profileForm = fb.group({
      name: ['', [Validators.required]],
      controlNumber: [{value: '', disabled: true}, [Validators.required]],
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
        let { uid, ...profile } = p
        console.log(profile);

        if (uid) {

          this.profileForm.setValue(
            profile
          )
        }
      }
    )
    this.careerService.getAll().subscribe(careers => {
      this.careers = careers
    })

    this.profileForm.get('name')?.valueChanges.subscribe((name:string) =>{
      let formattedName = name.toLowerCase().split(' ').map(word => word.length>0? word[0].toUpperCase() + word.substr(1): word).join(' ')
      console.log(this.titleCasePipe.transform(name))
      if( this.titleCasePipe.transform(name) != name)
      this.profileForm.patchValue({name: this.titleCasePipe.transform(name)})
      
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

  closeProfile() {
    this.router.navigate(['students'])

  }
  compareCareer(val1:Career, val2:Career) {
    return val1.id === val2.id;
  }
}
