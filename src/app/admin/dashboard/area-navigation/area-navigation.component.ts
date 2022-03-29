import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-area-navigation',
  templateUrl: './area-navigation.component.html',
  styleUrls: ['./area-navigation.component.css']
})
export class AreaNavigationComponent implements OnInit {

  constructor(public route : ActivatedRoute) { }
  @Input() id:Observable<string> = of('')
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    console.log({aranav: id});
    
    this.route.paramMap.subscribe(e=>
      {
        console.log({paramap: e.get('id')})
      })
  }
  ngOnChanges(){
    console.log({id:this.id});
    
    
  }

}
