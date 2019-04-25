import { Component, OnInit } from '@angular/core';

import {CalendarManagementService} from '../../common/calendar-management.service';
import {Announcement} from '../../common/announcements.model';


@Component({
  selector: 'app-announcements-home',
  templateUrl: './announcements-home.component.html',
  styleUrls: ['./announcements-home.component.css'],
  providers: [CalendarManagementService]
})
export class AnnouncementsHomeComponent implements OnInit {
  announcements: Announcement[];

  constructor(private cmService: CalendarManagementService) {
    this.announcements = this.cmService.getAnnouncements();
  }

  ngOnInit() {
  }

}
