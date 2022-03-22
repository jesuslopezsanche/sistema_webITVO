import { DocumentData } from 'rxfire/firestore/interfaces';
import { SessionService } from './../../services/session.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {
pendingSessions: DocumentData[] | null = null

  ngOnInit(): void {
  }

}
