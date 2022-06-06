import { switchMap, Observable, of, map } from 'rxjs';
import { AreaService, Area } from './../../../services/features/area.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  action = 'Crear'
  form: FormGroup
  selectedId: string | null = ''
  currArea: Observable<Area | null>;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private areaService: AreaService
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      capacity: ['', Validators.min(0)],
      career: ['', Validators.required],
      supervisor: ['', Validators.required],
      computers: [false, Validators.required],
      status: [true],
    })
    this.currArea = of(null)

  }

  ngOnInit(): void {
    this.selectedId = this.route.snapshot.paramMap.get('id')
    if (this.selectedId) {
      this.areaService.getById(this.selectedId).
        then(e => {
          this.form.setValue({
            name: e.name,
            capacity: e.capacity? e.capacity : '' ,
            career: e.capacity? e.career : '' ,
            supervisor: e.capacity? e.supervisor : '' ,
            computers: e.computers? e.computers : false ,
            status: e.status,
          })
        })
        this.action = 'Editar'
    }

  }

  back() {
    this.router.navigate(['/dashboard/areas'])
  }
  handleSubmit() {
    if (!this.form.valid) 
    alert('Por favor introduzca todos los datos requeridos')
    if (this.form.valid) {
      let area = {
        name: this.form.get('name')?.value,
        status: this.form.get('status')?.value,
        capacity: this.form.get('capacity')?.value,
        career: this.form.get('career')?.value,
        supervisor: this.form.get('supervisor')?.value,
        computers: this.form.get('computers')?.value,
      }
      if (this.action == "Crear") {
        
        this.areaService.create(area).subscribe(e => {
          if (e.id) {
            
            alert("Area creada Exitosamente!")
            this.back()
            return
          }
          alert("Error: Ocurrió un problema al intentar crear el registro, por favor, intente más tarde")
      return    
        })
      }
      if (this.action == "Editar") {
        
        this.areaService.update(this.selectedId!, area).subscribe(e => {
          if (e == null) {
            
            alert("Area actualizada!")
            this.back()
            return
          }
          alert("Error: Ocurrió un problema al intentar actualizar el registro, por favor, intente más tarde")
          return    
        })
      }
      
    }
    
  }
  
  
  deleteRegister(){
    this.areaService.deleteById(this.selectedId!).subscribe(e =>{
      if (e == null) {
        alert("Se eliminó el registro!")
        this.back()
        
      }
    })
  }

}
