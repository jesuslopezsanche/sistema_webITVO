import { AreaService } from './../../../services/features/area.service';
import { Observable, of, map, take, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-area-navigation',
  templateUrl: './area-navigation.component.html',
  styleUrls: ['./area-navigation.component.css']
})
export class AreaNavigationComponent implements OnInit {

  constructor(public route: ActivatedRoute, private areaService: AreaService) { }
  @Input() id: Observable<string> = of('')
  ngOnInit(): void {
    let id = this.route.paramMap.subscribe(
      e => {
        let areaId=e.get('areaId')!
        this.areaService.setSelectedArea(areaId)
        return of(e.get('areaId'))
      }
    )
  }
  ngOnChanges() {


  }

}
