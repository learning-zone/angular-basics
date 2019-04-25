import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import {CalendarEvent, CalendarEventAction, DAYS_OF_WEEK} from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { colors } from '../../../utilities/event-colors';
import {Subject} from 'rxjs';
import {CalendarManagementService} from '../calendar-management.service';
import {Announcement} from '../announcements.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../services/auth.service';
import {RolesService} from '../../../services/roles.service';
import {ParentsService} from '../../../services/parents.service';
import {CoursesService} from '../../../services/courses.service';
import {StudentsService} from '../../../services/students.service';
import {a, v} from '@angular/core/src/render3';
import { SocketService } from "../../../services/socket.service";
import { NotificationsService } from "angular2-notifications";

enum Event {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect'
}

@Component({
  selector: 'app-calendar-read-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-read-view.component.html',
  styleUrls: ['./calendar-read-view.component.css']
})
export class CalendarReadViewComponent implements OnInit {
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean;
  view: string = 'week';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  announcements: Announcement[];
  currentAnnouncement: Announcement = new Announcement();
  currentAction: string;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  colorEvent: any = colors.green;

  // related to internationalization
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  // related to event filtering for the current user
  isCurrentUserParent = false;
  parentId = '';
  announcementForThisParent: any ;
  parentCourseIDs: { id: string, itemName: string } [ ] = [] ;
  assignedStudents = [];
  messages: any[] = [];
  ioConnection: any;


  constructor(private cmService: CalendarManagementService,
              private modal: NgbModal,
              private authSvc: AuthService,
              public rolesSvc: RolesService,
              private parentsSvc: ParentsService,
              private coursesSvc: CoursesService,
              private studentsSvc: StudentsService,
              private socketService: SocketService,
              private _notificationSvc: NotificationsService
    ) { }

  get today() {
    return new Date();
  }

  ngOnInit() {
    this.initIoConnection();
    if (this.rolesSvc.isParent()) {
      this.isCurrentUserParent = true;
      this.parentId = this.authSvc.getCurrentUserId();
    }
    this.loadAnnouncements();
  }


  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService
      .onMessage()
      .subscribe((message: any) => {
        this.messages.push(message);
      });
    this.socketService.onEvent(Event.CONNECT).subscribe(() => {
      console.log("connected");
    });

    this.socketService.onEvent("anns").subscribe(data => {
      this.loadAnnouncements();
    });

    this.socketService.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log("disconnected");
    });
  }

  public loadAnnouncements() {
    this.cmService.loadAnnouncementsFromDB()
      .subscribe(
        (announcements: Announcement[]) => {
          this.cmService.setAnnouncements(announcements);
          this.announcements = this.cmService.getAnnouncements();

          for (let entry of announcements) {
            this.colorEvent = entry.id.startsWith('CF-') ? colors.yellow : colors.green ;
            if (this.rolesSvc.isParent()) {
              if (entry.id.startsWith('CF-')) {
                this.announcementForThisParent = null ;
                let courseIDs = [];
                let courseUniqueIDs = [];
                let totalCourses = [];
                this.parentsSvc.getSons(this.rolesSvc.getParentId()).subscribe(children => {
                  this.assignedStudents = children;
                  if (children.length > 0) {
                    for (let child of children) {
                      this.studentsSvc
                        .getCourses(child.student.id)
                        .subscribe(courses => {
                          totalCourses = courses;
                          for (let item of totalCourses) {
                            courseIDs.push(item['course-year'].courseId);
                          }
                          courseUniqueIDs = courseIDs.filter(function(element, index, originalArray) {
                            return originalArray.indexOf(element) === index;
                          });
                          this.parentCourseIDs = courseUniqueIDs;
                          this.colorEvent = entry.id.startsWith('CF-') ? colors.yellow : colors.green ;
                          if (this.parentCourseIDs.length > 0) {
                            for (const course of this.parentCourseIDs) {
                              this.announcementForThisParent = entry.courseMultiSelect.find(search => search.id === course.toString());
                              if (this.announcementForThisParent) {
                                  this.events.push({
                                    id: entry.id,
                                    start: new Date(entry.startDate.toString()),
                                    end: new Date(entry.endDate.toString()),
                                    title: entry.title,
                                    color: this.colorEvent,
                                  });
                                  if ( !this.isUnique(this.events)) {
                                    this.events.splice(this.events.length - 1, 1);
                                  }
                                  this.refresh.next();
                                  break;
                              }
                              this.announcementForThisParent = null;
                            }
                          }

                        });
                      }
                  }
                });
              } else {
                this.events.push({
                  id : entry.id,
                  start: new Date(entry.startDate.toString()),
                  end: new Date(entry.endDate.toString()),
                  title: entry.title,
                  color: this.colorEvent
                });
                if ( !this.isUnique(this.events)) {
                  this.events.splice(this.events.length - 1, 1);
                }
                this.refresh.next();
              }
            }
          }
          this.refresh.next();
        }
      );
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.currentAnnouncement = this.announcements.find( search => search.id === event.id.toString() );
    this.currentAction = action;
    if (this.currentAction === 'Clicked') {
      this.modal.open(this.modalContent);
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  isUnique(arr: any): boolean {
    let tmpArr = [];
    for ( let obj in arr ) {
      if ( tmpArr.indexOf(arr[obj].id) < 0){
        tmpArr.push(arr[obj].id);
      } else {
        return false; // Duplicate value for property1 found
      }
    }
    return true; // No duplicate values found for property1
  }

}
