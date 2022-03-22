import { AuthService } from './auth.service';
import { Firestore, getDocs, where, collection, CollectionReference, query } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { from, Observable, of, switchMap, take } from 'rxjs';
import { DocumentData, QueryDocumentSnapshot } from 'rxfire/firestore/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  colRef: CollectionReference
  sessions: Observable<QueryDocumentSnapshot<DocumentData> | null>
  uid: string | undefined;
  constructor(private firestore: Firestore, private authService: AuthService) {
    this.colRef = collection(this.firestore, 'sessions')
    this.uid = ''
    this.authService.user$.subscribe(r => this.uid = r?.uid)
    this.sessions = of(null)


  }
  getAll() {
    let sessions = getDocs(query(this.colRef, where('status', '!=', 'closed')))
    .then( e =>e.docs)
    .then(e => e.map(el => el.data()))
    console.log('aaaaaaaaaa', sessions);


    return from(sessions)
  }
  getAllfromStudent() {

    let sessions = this.authService.user$.pipe(
      switchMap(async user => {
        if (user)
          return await (await getDocs(query(this.colRef, where('student.uid', '==', this.uid), where('status', '!=', 'closed')))).docs
            .map(e => e.data())
        return null
      }
      )
    )

    return sessions
  }
}
