import { DocumentData } from '@angular/fire/firestore';
import { Material, MaterialService } from './../../services/features/material.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {

  materials: Material[] | null = null
  filteredMaterials: Material[] | null = null
  selectedArea: string = ''

  constructor(private materialService: MaterialService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.route.params.subscribe(e => {
    //   console.log({e});

    //   if (this.selectedId != e['aread'] && this.selectedId) {
    //     console.log('nope');
    //     return
    //   }
    //   this.selectedId = e['id']
    //   console.log('sssssssssssssss');
    // })
    this.route.paramMap.subscribe(e => {
      let newId = e.get('areaId')!
      if (this.selectedArea == newId)
        return
      this.getMaterials()
    })

  }
  edit(area: any) {
    console.log(area);

    this.router.navigate(['edit', area['id']], { relativeTo: this.route })

  }
  getMaterials() {
    this.materialService.getAll().subscribe(e => {
      this.materials = e.map(el => el)
      this.filteredMaterials = this.materials
    })
  }

  filterMaterials(ev: Event) {
    let select = ev.target as HTMLSelectElement
    console.log({select});
    
    if (select.value == '') {
      return this.filteredMaterials = this.materials
    }
    return this.filteredMaterials = this.materials!.filter(v => v.status == select.value)


  }
}