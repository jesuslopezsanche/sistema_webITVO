import { Router, ActivatedRoute } from '@angular/router';
import { GroupService } from './../../services/features/group.service';
import { DocumentData } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups: DocumentData[]| null= null

  constructor(private groupService: GroupService, private router: Router, private route: ActivatedRoute) {
    groupService.getAll().subscribe( e => this.groups = e.map(el=> el))
  }

  ngOnInit(): void {
  }
  edit(area:any){
    console.log(area);
    
    this.router.navigate(['edit',area['id']],{relativeTo: this.route})

  }

}
