import { Program, ProgramService } from './../../services/features/program.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Material, MaterialService } from './../../services/features/material.service';
import { AreaService } from './../../services/features/area.service';
import { AuthService } from './../../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attendance, AttendanceService } from './../../services/features/attendance.service';
import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Area } from 'src/app/services/features/area.service';

@Component({
  selector: 'app-new-attendance',
  templateUrl: './new-attendance.component.html',
  styleUrls: ['./new-attendance.component.css']
})
export class NewAttendanceComponent implements OnInit {

  attendanceForm: FormGroup
  areas: Area[] | null
  materials: Material[] | null
  programs: Program[] | null = null
  selectedPrograms: Program[] = []
  selectedMaterials: Material[] = []
  attendance: Attendance | null
  constructor(
    private attendanceService: AttendanceService,
    private fb: FormBuilder,
    private authService: AuthService,
    private areaService: AreaService,
    private materialService: MaterialService,
    private programService: ProgramService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.attendance = null
    this.areas = null
    this.materials = null
    this.attendance = { area: { name: '', status: 1 }, status: '' }
    this.attendanceForm = this.fb.group({
      area: ['', [Validators.required]],
      controlNumber: ['', [Validators.required]],
      material: ['', [Validators.required]],
      program: ['']
    })
  }

  async ngOnInit(): Promise<void> {
    this.attendanceService.getActiveFromStudent().subscribe(res => {
      console.log('activeSesh', res);
      if (res) {
        this.attendanceService.setActiveAttendance(res)
        this.router.navigate(['../qr'], { relativeTo: this.route })
      }

    })
    this.areaService.getAll().subscribe(area => {
      this.areas = area
    })


  }

  newAttendance() {
    // let attendance = this.attendance

    this.attendance = {
      area: this.attendanceForm.get('area')?.value,
      materialList: this.selectedMaterials,
      programList: this.selectedPrograms,
      status: 'open'
    }
    console.log(this.attendanceForm.get('area')?.value)
    if (this.attendance.area.name == '') {
      return alert('Selecciona el laboratorio al que quieres accesar')
    }
    if (!this.attendance.area.computers)
      if (this.attendance.materialList!.length < 1) {
        return alert('Selecciona los materiales que planeas usar')
      }
    if (this.attendance.area.computers)
      if (this.attendance.programList!.length < 1) {
        return alert('Selecciona el software que usarás')
      }
    this.authService.getStudentProfile().subscribe(async userProfile => {
      this.attendance!.student = userProfile
      // if (this.attendance!.controlNumber !== userProfile.controlNumber ) {
      //   return alert('Tu número de control no coincide con los registros')
      // }
      console.log(this.attendance);
      this.attendanceService.create(this.attendance!).subscribe(data => {
        console.log({ createdAttendance: data });

        this.router.navigate(['../', 'qr'], { relativeTo: this.route })
      })

    })

    this.attendanceForm.get('area')?.value


  }
  selectecAreaChanged(event: any) {
    let areaSelected = <Area>this.attendanceForm.get('area')?.value
    this.programs = null
    this.materials = null
    if (!areaSelected)
      return
    this.areaService.setSelectedArea(areaSelected.id!)
    if (!areaSelected.computers)
      this.materialService.getAll().subscribe(res => {
        this.materials = res
      })
    else
      this.programService.getAll().subscribe(res => {
        this.programs = res
      })
  }
  addToList(event: any) {
    console.log(event);
    let materialSelected = <Material>this.attendanceForm.get('material')?.value
    if (materialSelected.id) {
      this.selectedMaterials.push(materialSelected)

    }

  }
  deleteFromList(material: Material) {
    console.log('material deteled', material);
    let index = this.selectedMaterials.indexOf(material)
    this.selectedMaterials.splice(index, 1)
  }
  addToProgramsList(event: any) {
    console.log(event);
    let materialSelected = <Program>this.attendanceForm.get('program')?.value
    if (materialSelected.id) {
      this.selectedPrograms.push(materialSelected)

    }

  }
  deleteFromProgramsList(program: Program) {
    console.log('material deteled', program);
    let index = this.selectedPrograms.indexOf(program)
    this.selectedPrograms.splice(index, 1)
  }

}
