import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { TagModel } from '../model/tag.model';

import { EditTagService } from './edittag.service';

@Component({
    selector: 'app-edit-tag',
    templateUrl: './edittag.html',
    // styles: [],
})
export class EditTagComponent implements OnInit {
    public isConfirmLoading = false;
    public editTag: TagModel = new TagModel();
    @ViewChild('form') private form: NgForm;

    constructor (
        private router: Router,
        private route: ActivatedRoute,
        private EditTagService: EditTagService,
        private notification: NzNotificationService,
    ) {
    }

    public ngOnInit () {
        this.route.params.subscribe((param) => {
            if (param.id) {
                this.getData(param.id);
            }
        }, (err) => {
            this.notification.warning('错误', '参数错误');
        });
    }

    public getData (id: any) {
        this.EditTagService.getTag(id).subscribe((res: any) => {
            this.editTag = res.data;
        });
    }

    public save () {
        for (const i in this.form.controls) {
            this.form.controls[ i ].markAsDirty();
        }
        if (this.form.valid) {
            this.isConfirmLoading = true;
            this.EditTagService.updateTag(this.editTag)
                .finally(() => this.isConfirmLoading = false)
                .subscribe((res: any) => {
                    this.router.navigate(['/tag']);
                }, (err: any) => { });
        }
    }

    public back () {
        this.router.navigate(['./tag']);
    }

}
