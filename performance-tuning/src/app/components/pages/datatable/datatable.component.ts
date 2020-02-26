import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit {

  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  public data = [
    {name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com'},
    {name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com'},
    {name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com'},
    {name: 'therichpost', email: 'therichpost@gmail.com', website: 'therichpost.com'},
  ];

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

}
