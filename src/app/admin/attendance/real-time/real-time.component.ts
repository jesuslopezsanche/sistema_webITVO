import { Router, ActivatedRoute } from '@angular/router';
import { AreaService } from './../../../services/features/area.service';
import { Attendance, AttendanceService } from './../../../services/features/attendance.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.css']
})
export class RealTimeComponent implements OnInit {

  attendants: Attendance[]| null= null

  constructor(private attendanceService: AttendanceService,private areaService:AreaService, private router: Router, private route: ActivatedRoute) {
    route.params.subscribe( r => {
      if (r['areaId']) {
        areaService.setSelectedArea(r['areaId'])
        attendanceService.getAll().subscribe( e => this.attendants = e)
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
