import { DocumentData } from '@angular/fire/firestore';
import { ProgramService } from '../../services/features/program.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  programs: DocumentData[]| null= null
  selectedArea: string = ''

  constructor(private programService: ProgramService, private router: Router, private route: ActivatedRoute) {
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
      if(this.selectedArea == newId)
        return
        this.getPrograms()
    })
    
  }
  edit(area:any){
    console.log(area);
    
    this.router.navigate(['edit',area['id']],{relativeTo: this.route})

  }
  getPrograms(){
    this.programService.getAll().subscribe( e => this.programs = e.map(el=> el))
  }

}
