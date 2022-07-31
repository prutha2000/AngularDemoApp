import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AccountService } from '../_services/account.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor(public accountservice: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  Login() {
    this.accountservice.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/members');
    })
  }

  Logout(){
    this.accountservice.logout();
    this.router.navigateByUrl('/');
  }
}
