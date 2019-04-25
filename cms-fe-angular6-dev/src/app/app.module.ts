import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterModule } from '@angular/router';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

import { BreadCrumbComponent, HeaderComponent, SidebarComponent } from '../components/shared';
import { AppComponent }   from './app.component';
import { AppRouting }     from './app.routing';
import { HomeComponent }  from './home';
import { LoginComponent } from './login/login.component';

import { HttpClientInterceptor }    from '@utils/httpInterceptor';
import { AuthGuard }         from '@utils/auth/auth-guard.service';
import { AuthService }       from '../utils/auth/auth.service';
import { HelperService }     from '../utils/httpInterceptor/helper.service';
import { Params }            from '../utils/params.service';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    BreadCrumbComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // RouterModule,
    AppRouting,
    //
    NgZorroAntdModule.forRoot(),
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClientInterceptor,
      multi: true,
    },
    Params,
    HelperService,
    AuthGuard,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor () {}
}
