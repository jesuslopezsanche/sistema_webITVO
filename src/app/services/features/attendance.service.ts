import { Program } from './program.service';
import { Computer, ComputerService } from './computer.service';
import { Material } from './material.service';
import { Area, AreaService } from './area.service';
import { AuthService, Profile } from '../auth/auth.service'
import { Firestore, DocumentData, QueryDocumentSnapshot, Timestamp, getDocs, where, collection, CollectionReference, query, addDoc, getDoc, doc, setDoc, collectionSnapshots } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { from, Observable, of, switchMap, take, tap, map, mergeMap } from 'rxjs';

export interface Attendance {
  id?: string,
  area: Area,
  student?: Profile
  status: string
  computer?: Computer
  materialList?: Material[],
  materialIdList?: string[],
  programList?: Program[],
  programIdList?: string[],
  startDateTime?: Timestamp,
  endDateTime?: Timestamp,
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  colRef: CollectionReference
  sessions: Observable<QueryDocumentSnapshot<DocumentData> | null>
  uid: string | undefined;
  activeAttendance: Attendance | null = null
  constructor(private firestore: Firestore,
    private authService: AuthService,
    private computerService: ComputerService,
    private areaService: AreaService

  ) {
    this.colRef = collection(this.firestore, 'attendance')
    this.uid = ''
    this.authService.user$.subscribe(r => this.uid = r?.uid)
    this.sessions = of(null)

  }
  getAll() {
    let sessions = getDocs(query(this.colRef, where('status', '!=', 'closed'), where('area.id', '==', this.areaService.selectedArea)))
      .then(e => e.docs)
      .then(e => e.map(el => {
        return { id: el.id, ...el.data() } as unknown as Attendance
      }))
    return from(sessions)
  }
  getAllAttendances() {
    console.log('aateenda', { u: this.areaService.selectedArea });

    let sessions = getDocs(query(this.colRef, where('status', '==', 'closed'), where('area.id', '==', this.areaService.selectedArea)))
      .then(e => e.docs)
      .then(e => e.map(el => {
        return { id: el.id, ...el.data() } as unknown as Attendance
      }))
    return from(sessions)
  }
  getAllAttendancesInDate(date1: Date, date2: Date) {
    console.log(date1, date2);


    let sessions = getDocs(query(this.colRef, where('startDateTime', '>', Timestamp.fromDate(date1)), where('startDateTime', '<', Timestamp.fromDate(date2)),where('area.id', '==', this.areaService.selectedArea)))
      .then(e => e.docs)
      .then(e => e.map(el => {
        return { id: el.id, ...el.data() } as unknown as Attendance
      }))
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
        if (user)
          return collectionSnapshots(query(this.colRef, where('student.uid', '==', user.uid), where('status', '!=', 'closed')))

        return null
      }
      ),
      switchMap(r => r!.pipe(switchMap(r => r.map(e => {
        return { id: e.id, ...e.data() } as Attendance
      }))))
    )

    return sessions
  }
  create(attendance: Attendance) {
    if (attendance.area.computers) {

      return this.computerService.getAvailable().pipe(
        tap(r => {
          console.log({ availablecomputers: r });
          if (!r) {
            return null
          }
          let toUse = r!
          toUse.status = 'Rentado'

          return this.computerService.update(toUse.id!, toUse)
          // return r

        }),
        switchMap(r => {
          console.log({ availablecomputers: r });
          if (attendance.area.computers && !r) {
            this.say('Lo sentimos, por el momento no hay computadoras disponibles, inténtalo más tarde')
            return of(null)
          }
          if (attendance.area.computers) {
            attendance.computer = r!
            attendance.programIdList = attendance.programList!.map(e => e.id!)
          }
          return from(addDoc(this.colRef, attendance)
          )
        })
      )
    }
    else
      attendance.materialIdList = attendance.materialList!.map(e => e.id!)
    return from(addDoc(this.colRef, attendance).then(e => e))

    // return from(addDoc(this.colRef, area).then(e => e))

  }
  async registerAttendance(id: string) {
    let attendanceColRef = collection(this.firestore, 'attendance')
    let attendanceRecords = await getDocs(query(attendanceColRef, where('student.controlNumber', '==', id), where('status', '!=', 'closed')))
    // return 

    if (attendanceRecords.empty) {

      return alert('No se encontró la sesión, ponte en contacto con el administrador del área')
    }
    console.log((attendanceRecords.docs[0].data()));
    let attendanceRecord = attendanceRecords.docs[0]
    let attendanceData = { id: attendanceRecord.id, ...attendanceRecord.data() } as unknown as Attendance
    console.log({ attendanceData, attendanceId: id })
    // let time = await fetch('https://worldtimeapi.org/api/timezone/America/Mexico_city',
    //   {
    //     headers: {
    //       //   'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //     },
    //     method: 'GET',
    //     // mode:'cors'
    //   })
    // time = await time.json()
    let datetime = Timestamp.fromMillis(Date.now())
    if (attendanceData.status == 'open') {

      console.log('OPEN', { attendanceData, attendanceId: id })
      // return
      // alert('siexiste') 
      // return 0;

      attendanceData.startDateTime = datetime
      attendanceData.status = 'registered'
      let res = await setDoc(doc(this.colRef, attendanceData.id), attendanceData)
      this.say('Se ha registrado tu entrada')
      // alert(`Se ha registrado la entrada de ${attendanceData.student?.name} a la sala: ${attendanceData.area.name}, cuida y aprovecha las instalaciones`)

      return of(res)
      // student.data()
      // console.log({ time });
    }
    if (attendanceData.status == 'registered') {

      console.log('registered');
      if (!confirm('¿Confirma que quiere registrar su salida?'))
        return 0
      attendanceData.endDateTime = datetime
      attendanceData.status = 'closed'
      if (attendanceData.computer) {

        let computer = attendanceData.computer!
        console.log('primer status');

        computer.status = 'Disponible'
        console.log('segundo status');
        this.computerService.update(attendanceData.computer?.id!, computer).subscribe(r => console.log('computadora disponible', computer))
      }
      let res = await setDoc(doc(this.colRef, attendanceData.id), attendanceData)
      this.say(`Se ha registrado tu salida de la sala: ${attendanceData.area.name}`)
      return of(res)
    }
    console.log('not open');
    return { error: 'unknown error' }
  }

  setActiveAttendance(attendance: Attendance) {
    this.activeAttendance = attendance
  }

  say(phrase: string) {
    let voice = new SpeechSynthesisUtterance(phrase)
    voice.lang = 'es-Us'
    voice.volume = 1
    voice.rate = 1
    voice.pitch = .9

    let voices = speechSynthesis.getVoices().filter(e => e.lang.startsWith('es-'))
    if (!voices.length) {

      speechSynthesis.addEventListener(
        "voiceschanged",
        () => {
          voices = speechSynthesis.getVoices().filter(e => e.lang.startsWith('es-')).reverse()

          console.log({ voices });
          // voice.voice = voices[1]
          voice.onstart = () => console.log(44444444);

          let speech = speechSynthesis
          speech.cancel()
          speech.speak(voice)
          // speech.

          console.log({ speech, voice, voices });

        }
      );
    }
    let speech = speechSynthesis
    speech.cancel()
    speech.speak(voice)

  }

}
