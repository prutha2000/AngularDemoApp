import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/Models/Member';
import { PaginatedResult, Pagination } from 'src/app/Models/pagination';
import { MembersService } from 'src/app/_services/members.service';


@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;

  constructor(private memberServics: MembersService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    debugger;
    this.memberServics.getMembers(this.pageNumber, this.pageSize).subscribe(response => {
     this.members = response.result;
     this.pagination = response.pagination;
    })
  }

  pageChanged(event: any){
    this.pageNumber = event.page;
    this.loadMembers();
  }


}
