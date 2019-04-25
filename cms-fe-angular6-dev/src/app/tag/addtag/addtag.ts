import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { TagModel } from '../model/tag.model';

import { AddTagService } from './addtag.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './addtag.html',
  // styles: [],
})
export class AddTagComponent implements OnInit {
  public isConfirmLoading = false;
  public addTag: TagModel = new TagModel();
  @ViewChild('form') private form: NgForm;

  constructor (
    private router: Router,
    private addTagService: AddTagService,
    private notification: NzNotificationService,
    ) {
  }

  public ngOnInit () {
    //
  }

  public save () {
    for (const i in this.form.controls) {
        this.form.controls[ i ].markAsDirty();
    }
    if (this.form.valid) {
        this.isConfirmLoading = true;
        this.addTagService.addTag(this.addTag).subscribe((res: any) => {
        this.isConfirmLoading = false;
        this.notification.success('成功', res.msg);
        this.router.navigate(['/tag']);
        }, (err: any) => {
        this.isConfirmLoading = false;
        });
    }
  }

  public back () {
    this.router.navigate(['./tag']);
  }

}
