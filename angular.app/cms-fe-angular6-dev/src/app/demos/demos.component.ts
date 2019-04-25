import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd';
import { UrlModel } from './models/demo.model';
import { Params } from '../../utils/params.service';

@Component({
    selector: 'app-demos',
    templateUrl: './demos.html',
})
export class DemosComponent {
    // @ViewChild('form') private form: NgForm;

    private localIps = [
        /^10\.((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){2}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/, // 10.0.0.0-10.255.255.255
        /^172\.(1[6-9]|2\d|31)(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){2}$/, // 172.16.0.0-172.31.255.255
        /^192\.168(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){2}$/, // 192.168.0.0-192.168.255.255
        /^0\.0\.0\.0$/,
        /^127\.0\.0\.1$/,
    ];

    public status: number;
    public ip: string;
    public ipGeo: string;
    public uploadFile: string;
    public urlObj: UrlModel = new UrlModel();
    public jsonData: string;

    constructor (
        private http: HttpClient,
        private params: Params,
        private notification: NzNotificationService,
    ) {
    }

    public ngOnInit () {
        //
    }

    public testStatus () {
        if (!(this.status >= 200 && this.status < 600)) {
            this.notification.warning('警告', '请输入正确格式的状态码');
            return;
        }
        this.http.post('/test/status/' + this.status, {}).subscribe((res) => {
            console.log(res);
        }, (err) => {
            console.log(err);
        });
    }

    public queryIPGeo () {
        if (this.ip.match(/^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){2}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/)) {
            if (this.localIps.some((reg: RegExp) => reg.test(this.ip))) {
                this.notification.info('提示', '本地局域网ip');
            } else {
                this.http.post('/test/ip/' + this.ip, {}).subscribe((res: any) => {
                    this.ipGeo = JSON.stringify(res.data, null, '    ');
                }, (err) => {
                    console.log(err);
                });
            }
        } else {
            this.notification.warning('警告', '请输入正确格式的ip');
        }
    }

    public testUrl () {
        if (!this.urlObj.url || (this.urlObj.url && this.urlObj.url.indexOf('/') !== 0)) {
            this.notification.warning('警告', '请输入正确格式的url');
            return;
        }
        let params = null, error = false;
        try {
            if (this.urlObj.params) {
                params = JSON.parse(this.urlObj.params);
                if (typeof params !== 'object') {
                    throw new Error('not json');
                }
            }
        } catch (e) {
            error = true;
            this.notification.warning('警告', '请输入正确的json格式');
        }
        if (error) {
            return;
        }
        this.requestUrl(params).subscribe((res) => {
            this.jsonData = JSON.stringify(res, null, '    ');
        }, (err) => {
            console.log(err);
        });
    }

    private requestUrl (params: object) {
        let request: Observable<object>;
        switch (this.urlObj.method) {
            case 'POST':
                request = this.http.post(this.urlObj.url, params);
                break;
            case 'PUT':
                request = this.http.put(this.urlObj.url, params);
                break;
            case 'DELET':
                request = this.http.delete(this.urlObj.url);
                break;
            default:
                request = this.http.get(`${this.urlObj.url}?${this.params.fmtpages(params)}`);
                break;
        }
        return request;
    }

}
