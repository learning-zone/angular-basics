import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { ArticleTypeModel } from '../model/articletype.model';
import { AddArticleTypeService } from './addarticletype.service';

@Component({
  selector: 'app-add-articletype',
  templateUrl: './addarticletype.html',
  // styles: [],
})
export class AddArticleTypeComponent implements OnInit {
  public isConfirmLoading = false;
  public addArticleType: ArticleTypeModel = new ArticleTypeModel();
  @ViewChild('form') private form: NgForm;

  constructor (
    private router: Router,
    private addArticleTypeService: AddArticleTypeService,
    private notification: NzNotificationService,
  ) { }

  public ngOnInit () {
    //
  }

  public save () {
    for (const i in this.form.controls) {
      this.form.controls[ i ].markAsDirty();
    }
    if (this.form.valid) {
      this.isConfirmLoading = true;
      this.addArticleTypeService.addArticleType(this.addArticleType).subscribe((res: any) => {
        this.isConfirmLoading = false;
        this.notification.success('成功', res.msg);
        this.router.navigate(['/articletype']);
      }, (err: any) => {
        this.isConfirmLoading = false;
      });
    }
  }

  public back () {
    this.router.navigate(['./articletype']);
  }

}
