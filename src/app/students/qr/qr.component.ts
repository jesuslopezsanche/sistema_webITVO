import { Attendance } from './../../services/features/attendance.service';
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
  public attendance: Attendance | null = null;

  constructor(private authService: AuthService,  private attendanceService : AttendanceService) {
    this.user = null
  }

  ngOnInit(): void {
    if(this.attendanceService.activeAttendance){
      console.log("activealready");
      this.attendance = this.attendanceService.activeAttendance
      return
    }
    this.attendanceService.getActiveFromStudent().subscribe(res =>{
      if(res?.length != 0){
        console.log('activesesh', res);
        
        this.attendance = res![0]
      }
    })
    this.startCheckingSession()
    // console.log({ us: this.user });
  }

  startCheckingSession(){
    let maxTries = 3
    let tries = 0
    let interval = 15000
    console.log({maxTries, tries});
    let checksessionTimeout: any = setInterval(() => {
      console.log({maxTries, tries});
      if (tries < maxTries) {
        tries++
        console.log('is active?????');
        this.attendanceService.getActiveFromStudent().subscribe(res =>{
          if(res?.length != 0){
            console.log('activesesh', res);
            
            this.attendance = res![0]
          }
        })
        
      }else{
        
        return clearInterval(checksessionTimeout)
        return alert('se ha alcanzado el número máximo de intentos de registro, por favor actualiza la página')
      }
      
    }, interval);
  }

}
