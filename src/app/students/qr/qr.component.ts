import { SessionService } from './../../services/features/session.service';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {
pendingSessions: DocumentData[] | null = null
  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.getAllfromStudent().subscribe( e => {
      this.pendingSessions = e
    })
  }

}
