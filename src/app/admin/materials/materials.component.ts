import { DocumentData } from '@angular/fire/firestore';
import { MaterialService } from './../../services/features/material.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {

  materials: DocumentData[]| null= null

  constructor(private materialService: MaterialService, private router: Router, private route: ActivatedRoute) {
    materialService.getAll().subscribe( e => this.materials = e.map(el=> el))
  }

  ngOnInit(): void {
  }
  edit(area:any){
    console.log(area);
    
    this.router.navigate(['edit',area['id']],{relativeTo: this.route})

  }

}
