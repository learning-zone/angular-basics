import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { ArticleTypeModel } from '../model/articletype.model';
import { EditArticleTypeService } from './editarticletype.service';

@Component({
  selector: 'app-edit-articletype',
  templateUrl: './editarticletype.html',
  // styles: [],
})
export class EditArticleTypeComponent implements OnInit {
  public isConfirmLoading = false;
  public editArticleType: ArticleTypeModel = new ArticleTypeModel();
  @ViewChild('form') private form: NgForm;

  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private editArticleTypeService: EditArticleTypeService,
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
    this.editArticleTypeService.getArticleType(id).subscribe((res: any) => {
      this.editArticleType = res.data;
    }, (err) => {
      //
    });
  }

  public save () {
    for (const i in this.form.controls) {
      this.form.controls[ i ].markAsDirty();
    }
    if (this.form.valid) {
      this.isConfirmLoading = true;
      this.editArticleTypeService.updateArticleType(this.editArticleType).subscribe((res: any) => {
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
