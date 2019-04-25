import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BreadcrumbsModule } from "ng6-breadcrumbs";
import { SimpleNotificationsModule } from "angular2-notifications";

import { ConfigurationService } from "./services/configuration.service";
import { GestionService } from "./services/gestion.service";
import { StudentsService } from "./services/students.service";
import { TeachersService } from "./services/teachers.service";
import { AuthService } from "./services/auth.service";
import { LoginService } from "./services/login.service";
import { UsersService } from "./services/users.service";
import { RolesService } from "./services/roles.service";
import { ParentsService } from "./services/parents.service";
import { CoursesService } from "./services/courses.service";
import { SchoolYearsService } from "./services/school-years.service";
import { BellNotificationsService } from "./services/bell-notifications.service";

import { AppComponent } from "./app.component";
import { RouterModule, Routes } from "@angular/router";

import { TodaysComponent } from "./components/todays/todays.component";
import { IncomingComponent } from "./components/incoming/incoming.component";
import { HomeComponent } from "./components/home/home.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { GestionCurrentComponent } from "./components/gestion-current/gestion-current.component";
import { GestionListComponent } from "./components/gestion-list/gestion-list.component";
import { StudentRegisterComponent } from "./components/users/student-register/student-register.component";
import { UserManagementComponent } from "./components/users/user-management/user-management.component";
import { StudentListComponent } from "./components/users/student-list/student-list.component";
import { TeacherRegisterComponent } from "./components/users/teacher-register/teacher-register.component";
import { TeacherListComponent } from "./components/users/teacher-list/teacher-list.component";
import { UserInfoComponent } from "./components/users/user-info/user-info.component";
import { LoginInfoComponent } from "./components/users/login-info/login-info.component";
import { LoginComponent } from "./components/login/login.component";
import { TeacherInfoComponent } from "./components/users/teacher-info/teacher-info.component";
import { TeacherProfileComponent } from "./components/users/teacher-profile/teacher-profile.component";
import { UserInfoEditComponent } from "./components/users/user-info-edit/user-info-edit.component";
import { CourseHomeComponent } from "./components/admin/course-home/course-home.component";
import { LogoutComponent } from "./components/auth/logout/logout.component";
import { AdminRegisterComponent } from "./components/users/admin-register/admin-register.component";
import { UserInviteComponent } from "./components/users/user-invite/user-invite.component";
import { StudentFollowUpComponent } from "./components/students/student-follow-up/student-follow-up.component";
import { ParentListComponent } from "./components/users/parent-list/parent-list.component";
import { ParentRegisterComponent } from "./components/users/parent-register/parent-register.component";
import { ParentInfoComponent } from "./components/users/parent-info/parent-info.component";
import { UserInfoShowExtComponent } from "./components/users/user-info-show-ext/user-info-show-ext.component";
import { UserInfoEditExtComponent } from "./components/users/user-info-edit-ext/user-info-edit-ext.component";
import { ParentProfileComponent } from "./components/users/parent-profile/parent-profile.component";
import { UserInviteListComponent } from "./components/users/user-invite-list/user-invite-list.component";
import { UserFirstTimeComponent } from "./components/users/user-first-time/user-first-time.component";
import { GestionAddAdminComponent } from "./components/gestions/gestion-add-admin/gestion-add-admin.component";
import { TeacherManagementComponent } from "./components/users/teacher-management/teacher-management.component";
import { StudentManagementComponent } from "./components/users/student-management/student-management.component";
import { ParentManagementComponent } from "./components/users/parent-management/parent-management.component";

import { YearAddAdminComponent } from "./components/admin/year-add-admin/year-add-admin.component";
import { YearListAdminComponent } from "./components/admin/year-list-admin/year-list-admin.component";
import { StudentHomeComponent } from "./components/admin/student-home/student-home.component";
import { CourseAddAdminComponent } from "./components/admin/course-add-admin/course-add-admin.component";
import { CourseListAdminComponent } from "./components/admin/course-list-admin/course-list-admin.component";
import { StudentCourseComponent } from "./components/admin/student-course/student-course.component";
import { StudentParentsComponent } from "./components/admin/student-parents/student-parents.component";
import { TeacherHomeComponent } from "./components/admin/teacher-home/teacher-home.component";
import { ParentHomeComponent } from "./components/admin/parent-home/parent-home.component";
import { CourseYearComponent } from "./components/admin/course-year/course-year.component";
import { YearCourseComponent } from "./components/admin/year-course/year-course.component";
import { YearHomeComponent } from "./components/admin/year-home/year-home.component";
import { AnnListAdminComponent } from "./components/admin/ann-list-admin/ann-list-admin.component";
import { ParentsContainerComponent } from "./components/admin/parents-container/parents-container.component";
import { TeachersContainerComponent } from "./components/admin/teachers-container/teachers-container.component";
import { StudentsContainerComponent } from "./components/admin/students-container/students-container.component";
import { CoursesContainerComponent } from "./components/admin/courses-container/courses-container.component";
import { YearsContainerComponent } from "./components/admin/years-container/years-container.component";

import { CourseListComponent } from "./components/teacher/course-list/course-list.component";
import { TeacherCourseHomeComponent } from "./components/teacher/teacher-course-home/teacher-course-home.component";
import { TeacherCoursesContainerComponent } from "./components/teacher/teacher-courses-container/teacher-courses-container.component";

import { SonsContainerComponent } from './components/parent/sons-container/sons-container.component';
import { SonListComponent } from './components/parent/son-list/son-list.component';
import { SonHomeComponent } from "./components/parent/son-home/son-home.component";
import { PaginationComponent } from './components/common/pagination/pagination.component';
import {CalendarModule} from 'angular-calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CalendarHeaderComponent } from './components/common/calendar-header/calendar-header.component';
import { CalendarViewComponent } from './components/common/calendar-view/calendar-view.component';
import { TeacherStudentHomeComponent } from './components/teachers/teacher-student-home/teacher-student-home.component';
import { CalendarModalComponent } from './components/common/calendar-modal/calendar-modal.component';
import { CalendarReadViewComponent } from './components/common/calendar-read-view/calendar-read-view.component';
import { AnnouncementsHomeComponent } from './components/parent/announcements-home/announcements-home.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { QuestionsContainerComponent } from './components/parent/questions-container/questions-container.component';
import { QuestionsContainerTeacherComponent } from './components/teacher/questions-container-teacher/questions-container-teacher.component';
import { QuestionsCoursesTeacherComponent } from './components/teacher/questions-courses-teacher/questions-courses-teacher.component';
import { QuestionsCoursesComponent } from './components/parent/questions-courses/questions-courses.component';
import { QuestionHomeComponent } from './components/parent/question-home/question-home.component';
import { QuestionHomeTeacherComponent } from './components/teacher/question-home-teacher/question-home-teacher.component';
import { HeaderComponent } from './components/common/header/header.component';
import { ChangePasswordComponent } from './components/auth/change-password/change-password.component';

import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";
import { TeacherGuard } from "./guards/teacher.guard";
import { ParentGuard } from "./guards/parent.guard";


const appRoutes: Routes = [
  // Common pages
  {
    path: "home",
    component: HomeComponent,
    data: { breadcrumb: "Página Principal" }
  },
  {
    path: "logout",
    component: LogoutComponent
  },
  {
    path: "change-password",
    component: ChangePasswordComponent,
    data: { breadcrumb: "Cambiar Contraseña" }
    // canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent,
    data: { breadcrumb: "Iniciar Sesión" }
  },

  // Pages for admin
  {
    path: "gestion-current",
    component: GestionCurrentComponent,
    data: { breadcrumb: "Gestión Actual" }
    // canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "user-first-time/:email",
    component: UserFirstTimeComponent,
    data: { breadcrumb: "Establecer Password" }
  },
  {
    path: "admin-register",
    component: AdminRegisterComponent,
    data: { breadcrumb: "Registro de nuevo Administrador" }
  },

  {
    path: "teacher-management",
    component: TeachersContainerComponent,
    data: { breadcrumb: "Profesores" },
    // canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: "",
        component: TeacherManagementComponent,
        data: { breadcrumb: "Lista" }
        // canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: ":id",
        component: TeacherHomeComponent,
        data: { breadcrumb: "Detalles" }
        // canActivate: [AuthGuard, AdminGuard]
      }
    ]
  },
  {
    path: "teacher-register",
    component: TeacherRegisterComponent,
    data: { breadcrumb: "Registro de Profesores" }
    // canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "teacher-list",
    component: TeacherListComponent,
    data: { breadcrumb: "Lista de Profesores" }
    // canActivate: [AuthGuard, AdminGuard]
  },

  {
    path: "parent-management",
    component: ParentsContainerComponent,
    data: { breadcrumb: "Padres" },
    // canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: "",
        component: ParentManagementComponent,
        data: { breadcrumb: "Lista" }
        // canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: ":id",
        component: ParentHomeComponent,
        data: { breadcrumb: "Detalles" }
        // canActivate: [AuthGuard, AdminGuard]
      }
    ]
  },
  {
    path: "parent-register",
    component: ParentRegisterComponent,
    data: { breadcrumb: "Registro de Padres" }
    // canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "parent-list",
    component: ParentListComponent,
    data: { breadcrumb: "Lista de Padres" }
    // canActivate: [AuthGuard, AdminGuard]
  },

  {
    path: "student-management",
    component: StudentsContainerComponent,
    data: { breadcrumb: "Estudiantes" },
    // canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: "",
        component: StudentManagementComponent,
        data: { breadcrumb: "Lista" }
        // canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: ":id",
        component: StudentHomeComponent,
        data: { breadcrumb: "Detalles" }
        // canActivate: [AuthGuard, AdminGuard]
      }
    ]
  },
  {
    path: "student-register",
    component: StudentRegisterComponent,
    data: { breadcrumb: "Registro de Estudiantes" }
    // canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "student-list",
    component: StudentListComponent,
    data: { breadcrumb: "Lista de Estudiantes" }
    // canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "course-list-admin",
    component: CoursesContainerComponent,
    data: { breadcrumb: "Cursos" },
    // canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: "",
        component: CourseListAdminComponent,
        data: { breadcrumb: "Lista" }
        // canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: ":courseId",
        component: CourseYearComponent,
        data: { breadcrumb: "Detalles" }
        // canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: "rel/:courseYearId",
        component: CourseHomeComponent,
        data: { breadcrumb: "Detalle de Gestión" }
        // canActivate: [AuthGuard, AdminGuard]
      }
    ]
  },
  {
    path: "course-add-admin",
    component: CourseAddAdminComponent,
    data: { breadcrumb: "Añadir Curso" }
    // canActivate: [AuthGuard, AdminGuard]
  },

  {
    path: "years",
    component: ParentsContainerComponent,
    data: { breadcrumb: "Gestiones Escolares" },
    // canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: "",
        component: YearListAdminComponent,
        data: { breadcrumb: "Lista" }
        // canActivate: [AuthGuard, AdminGuard]
      },
      {
        path: ":id",
        component: YearHomeComponent,
        data: { breadcrumb: "Detalles" }
        // canActivate: [AuthGuard, AdminGuard]
      }
    ]
  },
  {
    path: "ann-list-admin",
    component: AnnListAdminComponent
    // canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "year-add-admin",
    component: YearAddAdminComponent,
    data: { breadcrumb: "Añadir" }
    // canActivate: [AuthGuard, AdminGuard]
  },

  // Pages for teacher role
  {
    path: "teacher-profile",
    component: TeacherProfileComponent
    // canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: "teacher-course-list",
    component: TeacherCoursesContainerComponent,
    data: { breadcrumb: "Cursos Asociados" },
    // canActivate: [AuthGuard, TeacherGuard],
    children: [
      {
        path: "",
        component: CourseListComponent,
        data: { breadcrumb: "Lista" }
        // canActivate: [AuthGuard, TeacherGuard]
      },
      {
        path: ":courseId",
        component: TeacherCourseHomeComponent,
        data: { breadcrumb: "Detalles" }
        // canActivate: [AuthGuard, TeacherGuard]
      },
      {
        path: ":courseId/teacher-student-home/:studentId",
        component: TeacherStudentHomeComponent,
        data: { breadcrumb: "Detalles de Estudiante" }
        // canActivate: [AuthGuard, TeacherGuard]
      }
    ]
  },
  {
    path: "student-follow-up",
    component: StudentFollowUpComponent
    // canActivate: [AuthGuard, TeacherGuard]
  },
  {
    path: "announcements-teacher-home",
    component: AnnListAdminComponent
    // canActivate: [AuthGuard, TeacherGuard]
  },
  {
    path: "teacher-questions",
    component: QuestionsContainerTeacherComponent,
    data: { breadcrumb: "Foro" },
    // canActivate: [AuthGuard, TeacherGuard],
    children: [
      {
        path: "",
        component: QuestionsCoursesTeacherComponent,
        data: { breadcrumb: "Conversaciones por Curso" }
        // canActivate: [AuthGuard, TeacherGuard]
      },
      {
        path: ":courseId",
        component: QuestionHomeComponent,
        data: { breadcrumb: "Lista" }
        // canActivate: [AuthGuard, TeacherGuard]
      }
    ]
  },

  // Pages for parent role
  {
    path: "parent-profile",
    component: ParentProfileComponent
    // canActivate: [AuthGuard, ParentGuard]
  },
  {
    path: "children",
    component: SonsContainerComponent,
    data: { breadcrumb: "Hijos Relacionados" },
    // canActivate: [AuthGuard, ParentGuard],
    children: [
      {
        path: "",
        component: SonListComponent,
        data: { breadcrumb: "Lista" }
        // canActivate: [AuthGuard, ParentGuard]
      },
      {
        path: ":id",
        component: SonHomeComponent,
        data: { breadcrumb: "Detalles" }
        // canActivate: [AuthGuard, ParentGuard]
      }
    ]
  },

  {
    path: "questions",
    component: QuestionsContainerComponent,
    data: { breadcrumb: "Foro" },
    // canActivate: [AuthGuard, ParentGuard],
    children: [
      {
        path: "",
        component: QuestionsCoursesComponent,
        data: { breadcrumb: "Conversaciones por Estudiante" }
        // canActivate: [AuthGuard, ParentGuard]
      },
      {
        path: ":id",
        component: QuestionHomeComponent,
        data: { breadcrumb: "Lista" }
        // canActivate: [AuthGuard, ParentGuard]
      }
    ]
  },

  {
    path: "announcements-parent-home",
    component: AnnouncementsHomeComponent
    // canActivate: [AuthGuard, ParentGuard]
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  { path: "**", component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TodaysComponent,
    IncomingComponent,
    HomeComponent,
    PageNotFoundComponent,
    GestionCurrentComponent,
    GestionListComponent,
    StudentRegisterComponent,
    UserManagementComponent,
    StudentListComponent,
    TeacherRegisterComponent,
    TeacherListComponent,
    UserInfoComponent,
    LoginInfoComponent,
    LoginComponent,
    TeacherInfoComponent,
    TeacherProfileComponent,
    UserInfoEditComponent,
    CourseHomeComponent,
    LogoutComponent,
    AdminRegisterComponent,
    UserInviteComponent,
    CourseListComponent,
    StudentFollowUpComponent,
    ParentListComponent,
    ParentRegisterComponent,
    ParentInfoComponent,
    UserInfoShowExtComponent,
    UserInfoEditExtComponent,
    ParentProfileComponent,
    UserInviteListComponent,
    UserFirstTimeComponent,
    CourseListAdminComponent,
    CourseAddAdminComponent,
    GestionAddAdminComponent,
    YearAddAdminComponent,
    YearListAdminComponent,
    StudentHomeComponent,
    StudentCourseComponent,
    YearCourseComponent,
    YearHomeComponent,
    StudentParentsComponent,
    TeacherManagementComponent,
    StudentManagementComponent,
    ParentManagementComponent,
    TeacherHomeComponent,
    ParentHomeComponent,
    CourseYearComponent,
    SonHomeComponent,
    TeacherCourseHomeComponent,
    AnnListAdminComponent,
    ParentsContainerComponent,
    TeachersContainerComponent,
    StudentsContainerComponent,
    CoursesContainerComponent,
    YearsContainerComponent,
    TeacherCoursesContainerComponent,
    SonsContainerComponent,
    SonListComponent,
    PaginationComponent,
    CalendarHeaderComponent,
    CalendarViewComponent,
    TeacherStudentHomeComponent,
    CalendarModalComponent,
    CalendarReadViewComponent,
    AnnouncementsHomeComponent,
    QuestionsContainerComponent,
    QuestionsContainerTeacherComponent,
    QuestionsCoursesTeacherComponent,
    QuestionsCoursesComponent,
    QuestionHomeComponent,
    QuestionHomeTeacherComponent,
    HeaderComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    BreadcrumbsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    AngularMultiSelectModule
  ],
  providers: [
    ConfigurationService,
    GestionService,
    StudentsService,
    TeachersService,
    AuthService,
    LoginService,
    UsersService,
    RolesService,
    ParentsService,
    CoursesService,
    SchoolYearsService,
    BellNotificationsService,
    AuthGuard,
    AdminGuard,
    TeacherGuard,
    TeacherGuard,
    ParentGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
