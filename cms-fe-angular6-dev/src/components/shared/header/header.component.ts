import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd';
import { AuthService }   from '@utils/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  // styleUrls : ['./header.component.less'],
  styles: [`
    header{position: relative}
    .logo{
      display: inline-block;
      margin: 15px;
      width:34px;
      height:34px;
      // background: url('/assets/images/logo.svg') no-repeat center center;
      // background-size: cover;
      animation: rotate 6s linear 0s infinite normal running;
      transform-origin: center center;
      // transition: all 0.3s;
    }
    .logo:hover{
      animation-play-state: paused;
    }
    .sys-name{
      font-size: 16px;
      color: #fff;
      margin: 28px 0 0;
      display: inline-block;
      vertical-align: top;
    }
    // .user-info{
    //   float: right;
    //   margin: 20px 20px 0 0;
    // }

    @keyframes rotate{
      from{
        transform: rotateZ(0deg)
      }
      to{
        transform: rotateZ(360deg)
      }
    }

    .bar-right{
      display: flex;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      align-items: center;
      padding-right: 10px;
    }
    .bar-right .lang{
      margin-right: 10px;
    }
    .bar-right .anticon{
      color: #fff;
      font-size: 24px;
      cursor: pointer;
    }
  `],
})
export class HeaderComponent implements OnInit {
  public store: any;
  public noticeOpened: boolean;
  public userInfo: object = {};

  constructor (private authService: AuthService, private nzI18nService: NzI18nService) {
    this.store = localStorage;
    this.noticeOpened = JSON.parse(this.store.getItem('NOTICE_OPEN') ? this.store.getItem('NOTICE_OPEN') : 'false');
  }

  public ngOnInit () {
    this.userInfo = JSON.parse(this.store.getItem('USER_INFO')) || {};
  }

  public toggleLang () {
    const lang: string = this.nzI18nService.getLocale().locale;
    console.log(lang, this.nzI18nService.getLocale());
    if (/zh/ig.test(lang)) {
      this.nzI18nService.setLocale(en_US);
    } else {
      this.nzI18nService.setLocale(zh_CN);
    }
  }

  public toggleNotice () {
    this.noticeOpened = !this.noticeOpened;
    this.store.setItem('NOTICE_OPEN', this.noticeOpened);
  }

  public logout () {
    this.authService.logout();
  }
}
