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
      serialNumber: ['', Validators.required],
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      brand: ['', Validators.required],
      status: ['Excelente', Validators.required],
    })
    this.currElement = of(null)

  }

  ngOnInit(): void {
    this.selectedId = this.route.snapshot.paramMap.get('id')
    if (this.selectedId) {
      this.material.getById(this.selectedId).
        then(e => {
          this.form.setValue({
            serialNumber: e.serialNumber,
            name: e.name,
            quantity: e.quantity,
            brand: e.brand,
            status: e.status
          })
        })
      this.action = 'Editar'
    }

  }

  back() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }
  handleSubmit() {
    if (this.form.valid) {
      let newData = {
        serialNumber: this.form.get('serialNumber')?.value,
        name: this.form.get('name')?.value,
        quantity: this.form.get('quantity')?.value,
        brand: this.form.get('brand')?.value,
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
  deleteRegister() {
    this.material.deleteById(this.selectedId!).subscribe(e => {
      if (e == null) {
        alert("Se eliminó el registro!")
        this.back()

      }
    })
  }
}
