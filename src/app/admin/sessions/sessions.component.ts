import { AttendanceService } from '../../services/features/attendance.service';
import { DocumentData } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  sessions : DocumentData[] | null= null
  constructor(private sessionService: AttendanceService) { }

  ngOnInit(): void {
    this.sessionService.getAll().subscribe(r => {
    console.log(r);
      
      this.sessions=r
    })
  }

}
