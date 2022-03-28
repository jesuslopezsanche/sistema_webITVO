import { GroupService, Group} from './../../../services/features/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {

  action = 'Crear'
  form: FormGroup
  selectedId: string | null = ''
  currElement: Observable<Group | null>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private groupService: GroupService
  ) {
    this.form = fb.group({
      name: ['', Validators.required],
      status: [true],
    })
    this.currElement = of(null)

  }

  ngOnInit(): void {
    this.selectedId = this.route.snapshot.paramMap.get('id')
    if (this.selectedId) {
      this.groupService.getById(this.selectedId).
        then(e => {
          this.form.setValue({
            name: e.name,
            status: e.status
          })
        })
        this.action = 'Editar'
    }

  }

  back() {
    this.router.navigate(['/dashboard/groups'])
  }
  handleSubmit() {
    if (this.form.valid) {
      let group = {
        name: this.form.get('name')?.value,
        status: this.form.get('status')?.value,
      }
      if (this.action == "Crear") {
        
        this.groupService.create(group).subscribe(e => {
          if (e.id) {
            
            alert("Grupo creado Exitosamente!")
            this.back()
            return
          }
          alert("Error: Ocurrió un problema al intentar crear el registro, por favor, intente más tarde")
      return    
        })
      }
      if (this.action == "Editar") {
        
        this.groupService.update(this.selectedId!, group).subscribe(e => {
          if (e == null) {
            
            alert("Grupo actualizada!")
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
    this.groupService.deleteById(this.selectedId!).subscribe(e =>{
      if (e == null) {
        alert("Se eliminó el registro!")
        this.back()
        
      }
    })
  }

}
