import { Computer, ComputerService } from './../../services/features/computer.service';
import { DocumentData } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materials',
  templateUrl: './computers.component.html',
})
export class ComputersComponent implements OnInit {

  computers: Computer[]| null= null
  selectedComputer: string = ''

  constructor(private computerService: ComputerService, private router: Router, private route: ActivatedRoute) {
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
    this.route.paramMap.subscribe(e =>{
      let newId= e.get('areaId')!
      if(this.selectedComputer == newId)
        return
        this.getComputers()
    })
    
  }
  edit(computer:any){
    console.log(computer);
    
    this.router.navigate(['edit',computer['id']],{relativeTo: this.route})

  }
  getComputers(){
    this.computerService.getAll().subscribe( e => this.computers = e)
  }

}
