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
    this.selectedId = route.paramMap.pipe(take(1), switchMap(p => {
      console.log({ pid: p.get('id') })
      this.selectedId = of(p.get('id'))
      return of(p.get('id'))
    }))
  }

  ngOnInit(): void {
  }


}
