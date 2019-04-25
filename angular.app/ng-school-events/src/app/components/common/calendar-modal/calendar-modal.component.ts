import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Announcement} from '../announcements.model';
import {RolesService} from '../../../services/roles.service';
import {CoursesService} from '../../../services/courses.service';
import {AuthService} from '../../../services/auth.service';
import {TeachersService} from '../../../services/teachers.service';


@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.component.html',
  styleUrls: ['./calendar-modal.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class CalendarModalComponent implements OnInit {
  closeResult: string;
  inputsForm: FormGroup;
  inputsCourseForm: FormGroup;
  title: string;
  description: string;
  startDateField: Date;
  durationField: number;
  announcement = new Announcement();
  @Output() passData: EventEmitter<Object> = new EventEmitter();
  currentAction: string;
  courseList = [];

  // multi-select
  // itemList = [];
  // selectedItems = [];
  // settings = {};
  itemList = [];
  selectedItems = [];
  settings = {
    text: 'Seleccione uno o más cursos',
    selectAllText: 'Marcar Todos',
    unSelectAllText: 'Desmarcar Todos',
    classes: 'myclass custom-class',
    enableSearchFilter: true,
    noDataLabel: 'No hay cursos relacionados con este usuario',
    searchPlaceholderText: 'Buscar por nombre de curso'
  };
  @Output() passCFData: EventEmitter<Object> = new EventEmitter();

  // load courses stuff
  searchText = '';
  teacherId = '';
  isCurrentUserTeacher: boolean = false;
  isCurrentUserAdmin: boolean = false;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public rolesSvc: RolesService,
    private coursesSvc: CoursesService,
    private authSvc: AuthService,
    private teachersSvc: TeachersService
    ) {
  }

  get today() {
    return new Date();
  }

  ngOnInit() {
    this.inputsForm = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      startDateField: ['', [Validators.required]],
      durationField: ['', [Validators.required, this.checkDuration]]
    });
    this.inputsCourseForm = this.fb.group({
      courseMultiSelect: [[], Validators.required],
      title: ['', [Validators.required]],
      description: [''],
      startDateField: ['', [Validators.required]],
      durationField: ['', [Validators.required, this.checkDuration]]
    });
    if (this.rolesSvc.isAdmin()) {
      this.isCurrentUserAdmin = true;
      this.loadAllCourseDataSet();
    } else if (this.rolesSvc.isTeacher()) {
      this.isCurrentUserTeacher = true;
      this.loadTeacherCourseDataSet();
      this.teacherId = this.authSvc.getCurrentUserId();
    }
  }

  open(action: string, content) {
    this.currentAction = action;
    // console.log(`Admin: ${this.isCurrentUserAdmin}`);
    // console.log(`Teacher: ${this.isCurrentUserTeacher}`);
    // console.log(`AdminServ: ${this.rolesSvc.isAdmin()}`);
    // console.log(`TeacherServ: ${this.rolesSvc.isTeacher()}`);
    if (this.currentAction === 'PerCourse') {
      // this.clearDataSets();
      if ( this.rolesSvc.isAdmin()) {
        this.loadAllCourseDataSet();
      } else if ( this.rolesSvc.isTeacher()) {
        this.loadTeacherCourseDataSet();
      }
    }
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  setValues() {
    this.announcement.id = this.generateId();
    this.announcement.title = this.inputsForm.get('title').value;
    this.announcement.description = this.inputsForm.get('description').value;
    this.announcement.startDate = this.inputsForm.get('startDateField').value;
    this.announcement.endDate = this.inputsForm.get('durationField').value;
    this.announcement.endDate = this.addDays(this.announcement.startDate, this.announcement.endDate);
    this.passData.emit(this.announcement);
    this.inputsForm.reset();
  }

  setCFValues() {
    this.announcement.id = this.generateCFId();
    this.announcement.title = this.inputsCourseForm.get('title').value;
    this.announcement.description = this.inputsCourseForm.get('description').value;
    this.announcement.startDate = this.inputsCourseForm.get('startDateField').value;
    this.announcement.endDate = this.inputsCourseForm.get('durationField').value;
    this.announcement.endDate = this.addDays(this.announcement.startDate, this.announcement.endDate);
    this.announcement.courseMultiSelect = this.inputsCourseForm.get('courseMultiSelect').value;
    if (this.rolesSvc.isTeacher()) {
      this.announcement.createdBy = this.authSvc.getCurrentUserId();
    }
    this.passCFData.emit(this.announcement);
    this.inputsCourseForm.reset();
  }

  generateId(): string {
    const id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    return id;
  }

  generateCFId(): string {
    const id = 'CF-' + (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    return id;
  }

  reset() {
    this.inputsForm.reset();
  }

  resetCF() {
    this.inputsCourseForm.reset();
  }

  private addDays(date: any, days: number ): Date {
    const result = new Date( date );
    result.setDate(result.getDate() + days - 1 );
    return result;
  }

  // validations
  checkDuration(control: FormControl) {
    if (control.value <= 0 || control.value > 30 ) {
      return {validDuration: true};
    } else {
      return null;
    }
  }

  // multi-select

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  loadAllCourseDataSet() {
    this.itemList = [];
    this.coursesSvc
      .getCourses(
        this.searchText,
        100,
        0
      )
      .subscribe(courses => {
        this.courseList = courses;
        for (let item of this.courseList) {
         this.itemList.push({
           id: item.id,
           itemName: item.name
         });
        }
        console.log('itemList');
        console.log(this.itemList);
      } );
  }

  loadTeacherCourseDataSet() {
    this.itemList = [];
    this.teachersSvc.getCourses(this.authSvc.getCurrentUserId()).subscribe(teacher => {
      if (teacher.length > 0) {
        this.teachersSvc
          .getCourseYear(teacher)
          .subscribe(courses => {
            this.courseList = courses;
            for (let item of this.courseList) {
              this.itemList.push({
                id: item.course.id,
                itemName: item.course.name
              });
            }
          } );
      }
    });
  }

  clearDataSets() {
    this.itemList = [];
    this.selectedItems = [];
  }
}

