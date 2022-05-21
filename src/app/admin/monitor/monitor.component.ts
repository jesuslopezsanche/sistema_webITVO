import { AttendanceService } from './../../services/features/attendance.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  scannerEnabled = true
  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void {
  }
  async registerStudentAttendance(result: string) {
    // this.scannerEnabled = false
    let res = await this.attendanceService.registerAttendance(result)
    // alert('succes: ' + result)
    console.log({res});
    // this.scannerEnabled=true
      
    

  }

}
