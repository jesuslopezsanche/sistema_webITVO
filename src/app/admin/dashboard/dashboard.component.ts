import { DocumentData } from 'rxfire/firestore/interfaces';
import { SessionService } from './../../services/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sessions : DocumentData[] | null= null
  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.getAll().subscribe(r => {
    console.log(r);
      
      this.sessions=r
    })
  }

}
