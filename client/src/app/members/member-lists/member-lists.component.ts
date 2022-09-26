import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/Models/Member';
import { PaginatedResult, Pagination } from 'src/app/Models/pagination';
import { User } from 'src/app/Models/user';
import { UserParams } from 'src/app/Models/UserParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';


@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList: [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];

  constructor(private memberServics: MembersService) { 
    this.userParams = this.memberServics.getUserParams()
    }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberServics.setUserParams(this.userParams);
    this.memberServics.getMembers(this.userParams).subscribe(response => {
     this.members = response.result;
     this.pagination = response.pagination;
    })
  }

  resetFilters(){
    this.userParams = this.memberServics.resetUserPramas();
    this.loadMembers();
  }

  pageChanged(event: any){
    this.userParams.pageNumber = event.page;
    this.memberServics.setUserParams(this.userParams);
    this.loadMembers();
  }


}
