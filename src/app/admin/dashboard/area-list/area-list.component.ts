import { Area } from './../../../services/features/area.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit {
  @Input() areas : Area [] =[]

  constructor() {
    console.log(this.areas);
    
   }

  ngOnInit(): void {
  }
  ngOnChanges(){
    console.log({areachanges: this.areas});
    
  }

}
