import { Component, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { NzNotificationService } from 'ng-zorro-antd';
import { AuthService } from '@utils/auth/auth.service';

const _PROD_ = process.env.NODE_ENV === 'production';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  // styles: [``],
})
export class HomeComponent implements OnDestroy {

  private counter: number = 0;
  private timer: any = null;
  private wsHost: string = (/^https:?/ig.test(location.protocol) ? 'wss' : 'ws') + '://' + `${location.host}/ws`;
  private ws: WebSocket;
  private wsInfo: WSInfoModel = new WSInfoModel();

  private ab2str (ab: ArrayBuffer): string {
    const s = String.fromCharCode.apply(null, new Uint8Array(ab));
    return decodeURIComponent(s);
  }

  private openWS () {
    if (!navigator.onLine) {
      this.notification.error('错误', '请检查网络连接!');
      return;
    }
    this.ws = null;
    this.ws = new WebSocket(this.wsHost);
    this.ws.binaryType = 'arraybuffer';
    this.ws.onopen = () => {
      this.counter = 0;
      this.ws.send('connect...');
    };
    //
    this.ws.onmessage = (mEvent: MessageEvent) => {
      const data: any = JSON.parse(this.ab2str(mEvent.data));
      const opened = JSON.parse(localStorage.getItem('NOTICE_OPEN') ? localStorage.getItem('NOTICE_OPEN') : 'false');
      console.log(data);
      if (data && data.data && opened) {
        this.wsInfo = data.data;
        this.notification.blank('<strong>访问信息</strong>',
          `<p class="sys_log_p">ip: ${this.wsInfo.ip}</p>
          <p class="sys_log_p">url: ${this.wsInfo.url}</p>
          <p class="sys_log_p">客户端: ${this.wsInfo.agent}</p>
          <p class="sys_log_p">位置: ${this.wsInfo.country_name_zh || '-'}/${this.wsInfo.subdivisions_name_zh || '-'}/${this.wsInfo.city_name_zh || '-'}</p>`, {});
      }
    };
    //
    this.ws.onclose = (data: any) => {
      console.log(data);
      this.reOpen();
    };
    //
    this.ws.onerror = (err: any) => {
      console.log(err);
      this.reOpen();
    };
  }

  private reOpen () {
    const opened = JSON.parse(localStorage.getItem('NOTICE_OPEN') ? localStorage.getItem('NOTICE_OPEN') : 'false');
    if (!opened) return;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.counter < 10) {
        if (this.ws.CLOSED === this.ws.readyState) {
          this.counter++;
          console.log('reopen');
          this.openWS();
        }
      } else {
        this.notification.error('错误', '请刷新网页重新连接通知!', {nzDuration: 0});
      }
    }, 6000);

  }

  constructor (private authService: AuthService, private notification: NzNotificationService) {
    // this.wsHost = (_PROD_ ? 'wss' : 'ws') + '://' + this.host;
  }

  public ngOnChanges () {
    // console.log('ngOnChanges');
  }

  public ngOnInit () {
    // console.log('ngOnInit');
  }

  public ngDoCheck () {
    // console.log('ngDoCheck');
  }

  public ngAfterContentInit () {
    // console.log('ngAfterContentInit');
  }

  public ngAfterContentChecked () {
    // console.log('ngAfterContentChecked');
  }

  public ngAfterViewInit () {
    // console.log('ngAfterViewInit');
    if (this.authService.isLogged) {
      this.openWS();
    }
  }

  public ngAfterViewChecked () {
    // console.log('ngAfterViewChecked');
  }

  public ngOnDestroy () {
    clearTimeout(this.timer);
  }

}

class WSInfoModel {
  public ip: string;
  public created_at: string;
  public url: string;
  public agent: string;
  public country_name_zh: string;
  public subdivisions_name_zh: string;
  public city_name_zh: string;
}
