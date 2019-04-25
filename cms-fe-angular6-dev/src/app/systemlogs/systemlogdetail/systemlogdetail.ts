import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { SystemLogModel } from '../model/systemlog.model';
import { SystemLogDetailService } from './systemlogdetail.service';

@Component({
    selector: 'app-systemlog-detail',
    templateUrl: './systemlogdetail.html',
    // styles: [``],
})
export class SystemLogDetailComponent implements OnInit {

    public mainModel: SystemLogModel = new SystemLogModel();
    @ViewChild('form') private form: NgForm;

    public checkedTag = {};
    public typeAjaxList: any[] = [];

    constructor (
        private router: Router,
        private route: ActivatedRoute,
        private systemLogDetailService: SystemLogDetailService,
        private notification: NzNotificationService,
    ) { }

    public ngOnInit () {
        this.route.params.subscribe((param) => {
            if (param.id) {
                this.getData(param.id);
            }
        }, (err) => {
            this.notification.warning('错误', '参数错误');
        });
    }

    public getData (id: string) {
        this.systemLogDetailService.getSystemLog(id).subscribe((res: any) => {
            this.mainModel = res.data;
        }, (err: any) => { });
    }

    public back () {
        this.router.navigate(['systemlog']);
    }

}
