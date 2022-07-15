import { AreaService } from './../../services/features/area.service';
import { Computer, ComputerService } from './../../services/features/computer.service';
import { DocumentData } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materials',
  templateUrl: './computers.component.html',
})
export class ComputersComponent implements OnInit {

  computers: Computer[] | null = null
  filteredComputers: Computer[] | null = null
  selectedComputer: string = ''
  filter: 'Disponible' | 'Rentado' | 'Mantenimiento' | '' = ''
  maxCapacity = false

  constructor(private computerService: ComputerService, private router: Router, private route: ActivatedRoute, public areaService : AreaService) {
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
      if (this.selectedComputer == newId)
        return
      this.getComputers()
    })

  }

  edit(computer: any) {
    console.log(computer);

    this.router.navigate(['edit', computer['id']], { relativeTo: this.route })

  }

  getComputers() {
    this.computerService.getAll().subscribe(e => {
      this.computers = e
      this.filteredComputers = e
      this.maxCapacity = this.areaService.currentArea?.capacity! <= this.computers.length
      console.log(this.maxCapacity);
      
    })
  }

  filterComputers(ev: Event) {
    let select = ev.target as HTMLSelectElement
    if (select.value == '') {
      return this.filteredComputers = this.computers
    }
    return this.filteredComputers = this.computers!.filter(v => v.status == select.value)
  }

}
