import { AreaService } from './../../services/features/area.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentData } from '@angular/fire/firestore';
import { AttendanceService, Attendance } from './../../services/features/attendance.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  attendants: Attendance[]| null= null

  constructor(private attendanceService: AttendanceService,private areaService:AreaService, private router: Router, private route: ActivatedRoute) {
    route.params.subscribe( r => {
      if (r['areaId']) {
        areaService.setSelectedArea(r['areaId'])
        attendanceService.getAllAttendances().subscribe( e => this.attendants = e)
      }
    })
    
  }

  ngOnInit(): void {
  }
  edit(area:any){
    console.log(area);
    
    this.router.navigate(['edit',area['id']],{relativeTo: this.route})

  }
}
