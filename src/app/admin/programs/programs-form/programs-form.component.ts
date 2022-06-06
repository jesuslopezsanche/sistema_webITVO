import { Program, ProgramService } from './../../../services/features/program.service';
import { GroupService } from './../../../services/features/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-programs-form',
  templateUrl: './programs-form.component.html',
  styleUrls: ['./programs-form.component.css']
})
export class ProgramsFormComponent implements OnInit {


  action = 'Crear'
  form: FormGroup
  selectedId: string | null = ''
  currElement: Observable<Program | null>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private programs: ProgramService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      version: ['', Validators.required],
      type: ['De Pago', Validators.required],
      license: [''],
      instalationDate: ['', Validators.required],
      brand: ['', Validators.required],
      status: ['Habilitado', Validators.required],
    })
    this.currElement = of(null)

  }

  ngOnInit(): void {
    this.selectedId = this.route.snapshot.paramMap.get('id')
    if (this.selectedId) {
      this.programs.getById(this.selectedId).
        then(e => {
          this.form.setValue({
            name: e.name,
            version: e.version,
            type: e.type,
            license: e.license,
            instalationDate: e.instalationDate,
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
        name: this.form.get('name')?.value,
        version: this.form.get('version')?.value,
        type: this.form.get('type')?.value,
        license: this.form.get('license')?.value,
        instalationDate: this.form.get('instalationDate')?.value,
        brand: this.form.get('brand')?.value,
        status: this.form.get('status')?.value,
      }
      if (this.action == "Crear") {

        this.programs.create(newData).subscribe(e => {
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

        this.programs.update(this.selectedId!, newData).subscribe(e => {
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
    this.programs.deleteById(this.selectedId!).subscribe(e => {
      if (e == null) {
        alert("Se eliminó el registro!")
        this.back()

      }
    })
  }
}
