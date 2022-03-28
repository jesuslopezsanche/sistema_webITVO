import { GroupService } from './../../../services/features/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Material, MaterialService } from './../../../services/features/material.service';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.css']
})
export class MaterialFormComponent implements OnInit {


  action = 'Crear'
  form: FormGroup
  selectedId: string | null = ''
  currElement: Observable<Material | null>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private material: MaterialService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      status: [true],
    })
    this.currElement = of(null)

  }

  ngOnInit(): void {
    this.selectedId = this.route.snapshot.paramMap.get('id')
    if (this.selectedId) {
      this.material.getById(this.selectedId).
        then(e => {
          this.form.setValue({
            name: e.name,
            description: e.description,
            status: e.status
          })
        })
      this.action = 'Editar'
    }

  }

  back() {
    this.router.navigate(['/dashboard/materials'])
  }
  handleSubmit() {
    if (this.form.valid) {
      let newData = {
        name: this.form.get('name')?.value,
        description: this.form.get('description')?.value,
        status: this.form.get('status')?.value,
      }
      if (this.action == "Crear") {

        this.material.create(newData).subscribe(e => {
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

        this.material.update(this.selectedId!, newData).subscribe(e => {
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
  deleteRegister(){
    this.material.deleteById(this.selectedId!).subscribe(e =>{
      if (e == null) {
        alert("Se eliminó el registro!")
        this.back()
        
      }
    })
  }
}
