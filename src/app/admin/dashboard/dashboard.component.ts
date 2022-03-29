import { ActivatedRoute } from '@angular/router';
import { Area, AreaService } from './../../services/features/area.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  areas : Area[] = []
  selectedId : Observable<string>
  constructor(private authService: AuthService, private areaService :AreaService, private route : ActivatedRoute) {
    areaService.getAll().subscribe( areas => this.areas =areas)
    this.selectedId = route.params.pipe(map(p => {
      console.log({pid: p['id']})
      return p['id']
    }))
    console.log({esss:this.selectedId});
    
     
   }

  ngOnInit(): void {
    console.log({esss:this.route.snapshot.params});
  }
  

}
