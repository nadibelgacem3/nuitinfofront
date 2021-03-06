import { Component, OnInit } from '@angular/core';
import { digitalListDB } from 'src/app/shared/tables/digital-list';
@Component({
  selector: 'app-digital-list',
  templateUrl: './digital-list.component.html',
  styleUrls: ['./digital-list.component.scss']
})
export class DigitalListComponent implements OnInit {
  public digital_list = []

  constructor() {
    this.digital_list = digitalListDB.digital_list;
  }

  public settings = {
    actions: {
      position: 'right'
    },
    columns: {
      id: {
        title: 'Id',
      },
      img: {
        title: 'Pub',
        type: 'html',
      },
      title: {
        title: 'Pub Title'
      },
      entry_type: {
        title: 'Description',
      },

    },
  };

  ngOnInit() { }

}
