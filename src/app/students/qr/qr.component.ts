import { tap } from 'rxjs';
import { AttendanceService } from '../../services/features/attendance.service';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {
  pendingSessions: DocumentData[] | null = null
  public user: User | null = null;

  constructor(private authService: AuthService) {
    this.user = null
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(e => {

      this.user = e
      console.log({ us: this.user });
      this.startCheckingSession()
     
    })
    console.log({ us: this.user });
  }

  startCheckingSession(){
    let maxTries = 5
    let tries = 0
    let interval = 10000
    console.log({maxTries, tries});
    let checksessionTimeout: any = setInterval(() => {
      console.log({maxTries, tries});
      if (tries < maxTries) {
        tries++
        console.log('is active?????');
        
      }else{
        
        return clearInterval(checksessionTimeout)
        return alert('se ha alcanzado el número máximo de intentos de registro, por favor actualiza la página')
      }
      
    }, interval);
  }

}
