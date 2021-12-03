import { Component, OnInit } from '@angular/core';
import { userListDB } from 'src/app/shared/tables/list-users';
import {UserService} from "../../../services/base/user.service";
import Swal from "sweetalert2";
import {HttpResponse} from "@angular/common/http";
import {TranslationMyWayService} from "../../../services/translation-my-way.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  public user_list = []

  constructor(protected userService: UserService, private pipeTranslate: TranslationMyWayService) {
    this.user_list = userListDB.list_user;
  }

  public settings = {
    columns: {
      avatar: {
        title: 'Avatar',
        type: 'html'
      },
      fName: {
        title: 'First Name',
      },
      lName: {
        title: 'Last Name'
      },
      email: {
        title: 'Email'
      },
      last_login: {
        title: 'Last Login'
      },
      role: {
        title: 'Role'
      },
    },
  };

  ngOnInit() {
    this.userService.query().subscribe(res => {
      this.user_list = res.body;

    })
  }

  onDelete(tiers: any) {
    const id = tiers.id;

    Swal.fire({
      title: this.pipeTranslate.translate('title_delete'),
      text: this.pipeTranslate.translate('category_delete'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#ff3d60',
      confirmButtonText: this.pipeTranslate.translate('confirmButtonText'),
      cancelButtonText: this.pipeTranslate.translate('noButtonText'),
    }).then(result => {
      if (result.value) {
        this.userService.delete(id).subscribe(() => {

          this.userService.query().subscribe(res => {
            this.user_list = res.body;

          })

          }
        );
        Swal.fire(this.pipeTranslate.translate('deleted'), this.pipeTranslate.translate('alert_delete'), 'success');
      }
    });
  }
}

