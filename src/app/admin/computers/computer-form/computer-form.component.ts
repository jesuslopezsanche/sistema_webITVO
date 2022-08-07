import { ComputerService } from './../../../services/features/computer.service';
import { GroupService } from '../../../services/features/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Material, MaterialService } from '../../../services/features/material.service';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-material-form',
  templateUrl: './computer-form.component.html',
})
export class ComputerFormComponent implements OnInit {


  lowerCasePipe = new LowerCasePipe()
  action = 'Crear'
  form: FormGroup
  selectedId: string | null = ''
  currElement: Observable<Material | null>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private computerService: ComputerService
  ) {
    this.form = this.fb.group({
      serialNumber: ['', Validators.required],
      name: ['', Validators.required],
      user: ['', Validators.required],
      brand: ['', Validators.required],
      status: ['Excelente', Validators.required],
      description: [''],
    })
    this.currElement = of(null)

  }

  ngOnInit(): void {
    this.selectedId = this.route.snapshot.paramMap.get('id')
    if (this.selectedId) {
      this.computerService.getById(this.selectedId).
        then(e => {
          this.form.patchValue({
            serialNumber: e.serialNumber,
            name: e.name,
            user: e.user,
            brand: e.brand,
            status: e.status,
            description: e.description,
          })
        })
      this.action = 'Editar'
    }
    this.form.get('user')?.valueChanges.subscribe((name:string) =>{
      console.log(this.lowerCasePipe.transform(name))
      if( this.lowerCasePipe.transform(name) != name)
      this.form.patchValue({user: this.lowerCasePipe.transform(name)})
      
    })

  }
  

  back() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }
  handleSubmit() {
    console.log('submited');
    console.log(this.action);
    
    if (!this.form.valid) 
    return alert('Por favor rellena todos los datos')
    if (this.form.valid) {
      let newData = {
        serialNumber: this.form.get('serialNumber')?.value,
        name: this.form.get('name')?.value,
        user: this.form.get('user')?.value,
        brand: this.form.get('brand')?.value,
        status: this.form.get('status')?.value,
        description: this.form.get('description')?.value,
      }
      if (this.action == "Crear") {

        this.computerService.create(newData).subscribe(e => {
          if (e.id) {

            alert("Registro creado Exitosamente!")
            this.back()
            return
          }
          alert("Error: Ocurrió un problema al intentar crear el registro, por favor, intente más tarde")
          return
        })
      }
      if (this.action == "Editar") {

        this.computerService.update(this.selectedId!, newData).subscribe(e => {
          if (e == null) {

            alert("Registro actualizado!")
            this.back()
            return
          }
          alert("Error: Ocurrió un problema al intentar actualizar el registro, por favor, intente más tarde")
          return
        })
      }

    }
  }
  deleteRegister() {
    this.computerService.deleteById(this.selectedId!).subscribe(e => {
      if (e == null) {
        alert("Se eliminó el registro!")
        this.back()

      }
    })
  }
}
