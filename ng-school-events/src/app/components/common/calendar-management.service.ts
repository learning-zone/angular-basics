import {EventEmitter, Injectable} from '@angular/core';
import {Announcement} from './announcements.model';

import { ConfigurationService } from '../../services/configuration.service';
import { HttpClientService } from '../../services/http-client.service';
import {Observable} from '../../../../node_modules/rxjs/Rx';
import {colors} from '../../utilities/event-colors';


@Injectable({
  providedIn: "root"
})
export class CalendarManagementService {
  announcementsChanged = new EventEmitter<Announcement[]>();
  singleAnnouncementsInserted = new EventEmitter<Announcement>();
  announcementsUpserted = new EventEmitter<Announcement>();
  announcementsDeleted = new EventEmitter<Announcement>();
  actionCRUD: string;
  private announcements: Announcement[] = [];

  constructor(
    private configSvc: ConfigurationService,
    private http: HttpClientService
  ) {}

  getAnnouncements() {
    return this.announcements.slice();
  }

  public loadAnnouncementsFromDB(): Observable<any> {
    return this.http
      .get(`${this.configSvc.backendUrl}/announcement2s`)
      .map(res => res.json())
      .catch((error: Response) => {
        return Observable.throw(
          "Something went wrong with the loading process of Announcements"
        );
      });
  }

  public getAnnsAll(): Observable<any> {
    return this.http
      .get(`${this.configSvc.backendUrl}/announcement2s?filter[order]=startDate ASC`)
      .map(res => res.json())
      .catch((error: Response) => {
        return Observable.throw("Something went wrong with the loading process of Announcements");
      });
  }

  public getAnnsCountAll(): Observable<any> {
    return this.http
      .get(`${this.configSvc.backendUrl}/announcement2s/count`)
      .map(res => res.json())
      .catch((error: Response) => {
        return Observable.throw(
          "Something went wrong with the loading process of Announcements"
        );
      });
  }

  addAnnouncement(announcement: any): Observable<any> {
    return this.http
      .post(this.configSvc.backendUrl + "/announcement2s", announcement)
      .map(res => res.json())
      .catch((error: Response) => {
        return Observable.throw(
          `Something went wrong with the adding an announcement:${announcement.toString()}`
        );
      });
  }

  registerAnnouncement(announcement: Announcement): void {
    console.log("post comand");
    console.log(announcement);
    this.http
      .post(this.configSvc.backendUrl + "/announcement2s", announcement)
      .map(res => res.json());
  }

  // EDIT STUFF
  upsertAnnouncement(announcement: any): Observable<any> {
    // this.announcementsUpserted.emit(announcement);
    return this.http
      .put(
        `${this.configSvc.backendUrl}/announcement2s/${announcement.id}`,
        announcement
      )
      .map(res => res.json())
      .catch((error: Response) => {
        return Observable.throw(
          `Something went wrong with the update of the announcement record:${announcement.toString()}`
        );
      });
  }

  // DELETE STUFF
  deleteAnnouncement(announcement: any): Observable<any> {
    return this.http
      .delete(this.configSvc.backendUrl + "/announcement2s/" + announcement.id)
      .map(res => res.json())
      .catch((error: Response) => {
        return Observable.throw(
          `Something went wrong with deleting the announcement record:${announcement.toString()}`
        );
      });
  }

  // experimental stuff
  setAnnouncements(announcements: Announcement[]) {
    this.announcements = announcements;
    this.announcementsChanged.emit(this.announcements.slice());
  }

  // experimental stuff
  updateSingleAnnouncement(announcement: Announcement, action: string) {
    if (action === "Insert") {
      this.announcements.push(announcement);
      this.singleAnnouncementsInserted.emit(announcement);
    } else {
      if (action === "Update") {
        const objIndex = this.announcements.findIndex(
          obj => obj.id === announcement.id.toString()
        );
        this.announcements[objIndex] = announcement;
        this.announcementsUpserted.emit(announcement);
      } else if (action === "Delete") {
        const evtIndex = this.announcements.findIndex(
          obj => obj.id === announcement.id.toString()
        );
        if (evtIndex !== -1) {
          this.announcements.splice(evtIndex, 1);
          this.announcementsDeleted.emit(announcement);
        }
      }
    }
  }
}

