import { ActivatedRoute } from '@angular/router';
import { Area, AreaService } from './../../services/features/area.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { map, Observable, of, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  areas: Area[] = []
  selectedId: Observable<string | null> = of(null)
  constructor(private authService: AuthService, private areaService: AreaService, private route: ActivatedRoute) {
    areaService.getAll().subscribe(areas => this.areas = areas)
    let id = this.route.paramMap.subscribe(
      e => {
        let areaId=e.get('areaId')!
        this.areaService.setSelectedArea(areaId)
        return of(e.get('areaId'))
      }
    )
  }

  ngOnInit(): void {
  }


}
