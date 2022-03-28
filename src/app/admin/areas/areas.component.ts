import { ActivatedRoute, Router } from '@angular/router';
import { map, take, switchMap } from 'rxjs';
import { DocumentData } from '@angular/fire/firestore';
import { AreaService } from './../../services/features/area.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  areas: DocumentData[]| null= null

  constructor(private areaService: AreaService, private router: Router, private route: ActivatedRoute) {
    areaService.getAll().subscribe( e => this.areas = e.map(el=> el))
  }

  ngOnInit(): void {
  }
  edit(area:any){
    console.log(area);
    
    this.router.navigate(['edit',area['id']],{relativeTo: this.route})

  }

}
