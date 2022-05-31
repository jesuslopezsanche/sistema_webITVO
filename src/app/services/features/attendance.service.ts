import { Computer, ComputerService } from './computer.service';
import { Material } from './material.service';
import { Area } from './area.service';
import { AuthService, Profile } from '../auth/auth.service'
import { Firestore, DocumentData, QueryDocumentSnapshot, getDocs, where, collection, CollectionReference, query, addDoc, getDoc, doc, setDoc } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { from, Observable, of, switchMap, take, tap, map, mergeMap } from 'rxjs';

export interface Attendance {
  id?: string,
  area: Area,
  student?: Profile
  status: string
  computer?: Computer
  materialList?: Material[],
  startDateTime?: string,
  endDateTime?: string,
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  colRef: CollectionReference
  sessions: Observable<QueryDocumentSnapshot<DocumentData> | null>
  uid: string | undefined;
  activeAttendance: Attendance | null = null
  constructor(private firestore: Firestore, private authService: AuthService, private computerService: ComputerService) {
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
          return await (await getDocs(query(this.colRef, where('student.uid', '==', user.uid), where('status', '==', 'closed')))).docs
            .map(e => {
              return { id: e.id, ...e.data() } as unknown as Attendance
            })
        return null
      }
      )
    )

    return sessions
  }
  getActiveFromStudent() {
    let sessions = this.authService.user$.pipe(
      switchMap(async user => {
        console.log('query');

        if (user)
          return await (await getDocs(query(this.colRef, where('student.uid', '==', user.uid), where('status', '!=', 'closed')))).docs
            .map(e => {
              console.log({ e });

              return { id: e.id, ...e.data() } as unknown as Attendance
            })
        return null
      }
      )
    )

    return sessions
  }
  create(area: Attendance) {
    return this.computerService.getAvailable().pipe(
      tap(r => {
        console.log({availablecomputers: r});
        let toUse = r
        toUse.status = 'Rentado'

        return this.computerService.update(toUse.id!,toUse)
        // return r
        
      }),
      switchMap(r => {
        area.computer = r
        return from(addDoc(this.colRef, area).then(e => e))})
    )

    // return from(addDoc(this.colRef, area).then(e => e))

  }
  async registerAttendance(attendanceId: string) {
    let attendanceColRef = collection(this.firestore, 'attendance')
    let attendanceRecord = await getDoc(doc(attendanceColRef, attendanceId))
    if (!attendanceRecord.exists()) {

      return alert('No se encontró la sesión, ponte en contacto con el administrador del área')
    }
    let attendanceData = { id: attendanceRecord.id, ...attendanceRecord.data() } as unknown as Attendance
    console.log({ attendanceData, attendanceId })
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
    let datetime = <any>time
    datetime = datetime.datetime
    if (attendanceData.status == 'open') {

      console.log('OPEN', { attendanceData, attendanceId })
      // return
      // alert('siexiste') 
      // return 0;

      attendanceData.startDateTime = datetime
      attendanceData.status = 'registered'
      let res = setDoc(doc(this.colRef, attendanceId), attendanceData)
      alert(`Se ha registrado la entrada de ${attendanceData.student?.name} a la sala: ${attendanceData.area.name}, cuida y aprovecha las instalaciones`)

      return of(res)
      // student.data()
      console.log({ time });
    }
    if (attendanceData.status == 'registered') {
      
      console.log('registered');
      if (!confirm('¿Confirma que quiere registrar su salida?'))
      return 0
      attendanceData.endDateTime = datetime
      attendanceData.status = 'closed'
      let computer = attendanceData.computer!
      computer.status = 'Disponible'
      this.computerService.update(attendanceData.computer?.id!, computer).subscribe(r => console.log('computadora disponible', computer))
      let res = await setDoc(doc(this.colRef, attendanceId), attendanceData)
      alert(`Se ha registrado la salida de ${attendanceData.student?.name} de la sala: ${attendanceData.area.name}, esperemos que haya aprendido mucho hoy!`)
      return of(res)
    }
    console.log('not open');
    return {error: 'unknown error'}

    // let 
    // let attendanceDoc = await addDoc(this.colRef, )
    // return attendanceDoc

  }
  setActiveAttendance(attendance: Attendance) {
    this.activeAttendance = attendance
  }

}
