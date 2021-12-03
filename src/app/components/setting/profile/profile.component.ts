import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../core/auth/account.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor( protected accountService: AccountService) { }
  account: any;
  ngOnInit() {
    this.accountService.identity().subscribe(account => {
      this.account = account;
    });
  }

}
