import { AreaService } from './../../../services/features/area.service';
import { Observable, of, map, take, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-area-navigation',
  templateUrl: './area-navigation.component.html',
})
export class AreaNavigationComponent implements OnInit {

  constructor(public route: ActivatedRoute, private router: Router, public areaService: AreaService) { }
  @Input() id: Observable<string> = of('')
  ngOnInit(): void {
    let id = this.route.paramMap.subscribe(
      e => {
        let areaId=e.get('areaId')!
        this.areaService.setSelectedArea(areaId)
        if (this.areaService.currentArea?.computers){
          this.router.navigate(['programs'], {relativeTo: this.route})
        }
        return of(e.get('areaId'))
      }
    )
  }
  ngOnChanges() {


  }

}
