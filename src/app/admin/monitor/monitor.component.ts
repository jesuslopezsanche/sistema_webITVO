import { AttendanceService } from './../../services/features/attendance.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void {
  }
  registerStudentAttendance(result: string) {
    alert('succes: ' + result)
    this.attendanceService.registerStudent(result)

  }

}
