import { Component, OnInit} from '@angular/core';

import {CalendarManagementService} from '../../common/calendar-management.service';
import {Announcement} from '../../common/announcements.model';

import { RolesService } from '../../../services/roles.service';
import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'app-ann-list-admin',
  templateUrl: './ann-list-admin.component.html',
  styleUrls: ['./ann-list-admin.component.css'],
  providers: [CalendarManagementService]
})
export class AnnListAdminComponent implements OnInit {
  announcements: Announcement[];
  announcement = new Announcement();

  constructor(
    private cmService: CalendarManagementService,
    public rolesSvc: RolesService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.announcements = this.cmService.getAnnouncements();
    // this.cmService.announcementsChanged
    //   .subscribe(
    //     (announcements: Announcement[]) => {
    //       this.announcements = announcements;
    //     }
    //   );
  }

  public sendAnnNotification(message: string) {
    if (!message) {
      return;
    }
    this.socketService.annNotification({
      from: this.rolesSvc.getUserName(),
      content: message
    });
  }

  getData(message: Announcement) {
    this.cmService.addAnnouncement(message).subscribe(
    (response) => {
      this.sendAnnNotification('A General Announcement was created');
      console.log(response);
      this.cmService.updateSingleAnnouncement(message, 'Insert');
    },
      (error) => console.log(error)
    );
  }

  getCFData(message: any) {
    // CO-ANN INSERTION
    this.cmService.addAnnouncement(message).subscribe(
      (response) => {
        this.sendAnnNotification("An Announcement per Course(s) was created");
        this.cmService.updateSingleAnnouncement(message, 'Insert');
      },
      (error) => console.log(error)
    );
    console.log('GET CF DATA');
    console.log(message);
  }

  private addDays(date: any, days: number ): Date {
    const result = new Date( date );
    result.setDate(result.getDate() + days - 1 );
    return result;
  }


}
