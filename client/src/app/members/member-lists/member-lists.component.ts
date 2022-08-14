import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/Models/Member';
import { MembersService } from 'src/app/_services/members.service';


@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {
  members: Member[];
  constructor(private memberServics: MembersService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberServics.getMembers().subscribe(members => {
      this.members = members;
    })
  }

}
