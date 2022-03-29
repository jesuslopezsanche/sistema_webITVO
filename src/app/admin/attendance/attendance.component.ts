import { Router, ActivatedRoute } from '@angular/router';
import { DocumentData } from '@angular/fire/firestore';
import { AttendanceService } from './../../services/features/attendance.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  attendants: DocumentData[]| null= null

  constructor(private attendanceService: AttendanceService, private router: Router, private route: ActivatedRoute) {
    attendanceService.getAll().subscribe( e => this.attendants = e.map(el=> el))
  }

  ngOnInit(): void {
  }
  edit(area:any){
    console.log(area);
    
    this.router.navigate(['edit',area['id']],{relativeTo: this.route})

  }
}
