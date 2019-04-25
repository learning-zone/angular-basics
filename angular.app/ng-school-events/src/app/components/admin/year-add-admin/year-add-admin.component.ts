import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-year-add-admin',
  templateUrl: './year-add-admin.component.html',
  styleUrls: ['./year-add-admin.component.css']
})
export class YearAddAdminComponent implements OnInit {l

  @Input() schoolYearInfo;
  constructor() {
    this.schoolYearInfo = {};
  }

  ngOnInit() {
  }

}
