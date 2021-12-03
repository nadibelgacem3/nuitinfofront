import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService } from '../../service/nav.service';
import {Router} from "@angular/router";
import {AuthfakeauthenticationService} from "../../../core/services/authfake.service";
import {CookieService} from "ngx-cookie-service";
import {AccountService} from "../../../core/auth/account.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile : boolean;

  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(public navServices: NavService,  private router: Router,
              private authFackservice: AuthfakeauthenticationService,
             public cookiesService: CookieService,
              protected accountService: AccountService) { }

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }


  ngOnInit() {  }

  logout() {
    this.cookiesService.deleteAll();
    this.authFackservice.logout();
    sessionStorage.removeItem("authenticationToken");
    localStorage.clear();
    //   }
    this.router.navigate(['/auth/login']);
    this.accountService.authenticate(null);
  }
}
