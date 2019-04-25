import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { CommentModel } from '../model/comment.model';
import { CommentDetailService } from './commentdetail.service';

@Component({
    selector: 'app-comment-detail',
    templateUrl: './commentdetail.html',
    // styles: [``],
})
export class CommentDetailComponent implements OnInit {

    public mainModel: CommentModel = new CommentModel();
    @ViewChild('form') private form: NgForm;

    public checkedTag = {};
    public typeAjaxList: any[] = [];

    constructor (
        private router: Router,
        private route: ActivatedRoute,
        private commentDetailService: CommentDetailService,
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
        this.commentDetailService.getComment(id).subscribe((res: any) => {
            this.mainModel = res.data;
        }, (err: any) => { });
    }

    public back () {
        this.router.navigate(['comment']);
    }

}
