import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { ArticleModel, ITag } from '../model/article.model';
import { EditArticleService } from './editarticle.service';

@Component({
    selector: 'app-edit-aritcle',
    templateUrl: './editarticle.html',
    // styles: [``],
})
export class EditArticleComponent implements OnInit {
    public isConfirmLoading = false;
    public mainModel: ArticleModel = new ArticleModel();
    @ViewChild('form') private form: NgForm;

    public tagList: ITag[] = [];
    public _tagList: object[] = [];
    public checkedTag = {};
    public typeAjaxList: any[] = [];

    constructor (
        private router: Router,
        private route: ActivatedRoute,
        private editArticleService: EditArticleService,
        private notification: NzNotificationService,
    ) { }

    public ngOnInit () {
        this.route.params.subscribe((param) => {
            if (param.id) {
                this.getData(param.id);
            }
            this.getTypeList();
            this.getTagList();
        }, (err) => {
            this.notification.warning('错误', '参数错误');
        });
    }

    public getData (id: string) {
        this.editArticleService.getArticle(id).subscribe((res: any) => {
            this.mainModel = res.data;
            res.data.tag.split(',').forEach((v: string) => {
                this.checkedTag[v] = true;
            });
        }, (err: any) => {
            //
        });
    }

    public getPics (url: string) {
        return !!url ? url + '?Authorization-User=' + localStorage.getItem('ACCESS_TOKEN') : '';
    }

    public save () {
        for (const i in this.form.controls) {
            this.form.controls[ i ].markAsDirty();
        }
        this.mainModel.tag = this.getCheckedTag();
        if (this.form.valid) {
            this.isConfirmLoading = true;
            this.editArticleService.updateArticle(this.mainModel)
                .finally(() => this.isConfirmLoading = false)
                .subscribe((res: any) => {
                    this.router.navigate(['/article']);
                }, (err: any) => {
                });
        }
    }

    public getTypeList () {
        this.editArticleService.getTypes().subscribe((res: any) => {
            this.typeAjaxList = res.data;
        }, (err: any) => {
            //
        });
    }

    public getTagList () {
        this.editArticleService.getTags().subscribe((res: any) => {
            this.tagList = res.data;
        }, (err: any) => {
            //
        });
    }

    public getCheckedTag () {
        return this.tagList.filter((t) => {
            return this.checkedTag[t.name];
        }).map((t) => {
            return t.name;
        }).join(',');
    }

    public back () {
        this.router.navigate(['article']);
    }

}
