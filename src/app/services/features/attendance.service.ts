import { Area } from './area.service';
import { AuthService } from '../auth/auth.service'
import { Firestore, DocumentData, QueryDocumentSnapshot, getDocs, where, collection, CollectionReference, query, addDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { from, Observable, of, switchMap, take } from 'rxjs';

export interface Attendance {
  id?: Area,
  area: Area,
  controlNumber: string,
  name: string,
  carrer: string,
  startDateTime: string,
  endDateTime: string,
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  colRef: CollectionReference
  sessions: Observable<QueryDocumentSnapshot<DocumentData> | null>
  uid: string | undefined;
  constructor(private firestore: Firestore, private authService: AuthService) {
    this.colRef = collection(this.firestore, 'attendance')
    this.uid = ''
    this.authService.user$.subscribe(r => this.uid = r?.uid)
    this.sessions = of(null)

  }
  getAll() {
    let sessions = getDocs(query(this.colRef, where('status', '!=', 'closed')))
      .then(e => e.docs)
      .then(e => e.map(el => el.data()))
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
  create(area: Attendance) {
    return from(addDoc(this.colRef, area).then(e => e))
  }
  async registerStudent(student: string) {
    let time = await fetch('https://worldtimeapi.org/api/timezone/America/Mexico_city',
      {
        headers: {
        //   'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        method: 'GET',
        // mode:'cors'
      })
      time = await time.json()
    console.log({ timea: await time.json()});
    // addDoc(this.colRef,{student_id: student, startHour: time)

  }

}
