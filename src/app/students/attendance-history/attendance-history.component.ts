import { AttendanceService, Attendance } from './../../services/features/attendance.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-history',
  templateUrl: './attendance-history.component.html',
  styleUrls: ['./attendance-history.component.css']
})
export class AttendanceHistoryComponent implements OnInit {

  attendanceHistory : Attendance[] | null = null
  constructor(private attendanceService :AttendanceService) { }

  ngOnInit(): void {
    this.attendanceService.getAllfromStudent().subscribe(r => {
      console.log(r);
      
      this.attendanceHistory = r
    })
  }

}
