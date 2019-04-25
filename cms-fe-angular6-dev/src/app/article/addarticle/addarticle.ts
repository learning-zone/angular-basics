import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { ArticleModel, ITag } from '../model/article.model';
import { AddArticleService } from './addarticle.service';

@Component({
    selector: 'app-add-article',
    templateUrl: './addarticle.html',
    // styles: [``],
})
export class AddArticleComponent implements OnInit {
    public isConfirmLoading = false;
    public addArticle: ArticleModel = new ArticleModel();
    @ViewChild('form') private form: NgForm;

    public tagList: ITag[] = [];
    public checkedTag: object = {};
    public typeAjaxList: any[] = [];

    constructor (
        private router: Router,
        private addArticleService: AddArticleService,
        private notification: NzNotificationService,
    ) { }

    public ngOnInit () {
        this.getTypeList();
        this.getTagList();
    }

    public save () {
        for (const i in this.form.controls) {
            this.form.controls[ i ].markAsDirty();
        }
        this.addArticle.tag = this.getCheckedTag();
        if (this.form.valid) {
            this.isConfirmLoading = true;
            this.addArticleService.insertArticle(this.addArticle).subscribe((res: any) => {
                this.isConfirmLoading = false;
                this.router.navigate(['/article']);
            }, (err: any) => {
                this.isConfirmLoading = false;
            });
        }
    }

    public getTypeList () {
        this.addArticleService.getTypes().subscribe((res: any) => {
            this.typeAjaxList = res.data;
        }, (err: any) => {
            //
        });
    }

    public getTagList () {
        this.addArticleService.getTags().subscribe((res: any) => {
            this.tagList = res.data;
        }, (err: any) => {
            //
        });
    }

    public getCheckedTag () {
        const arr = [];
        for (const item of this.tagList) {
            if (this.checkedTag[item.id]) {
                arr.push(item.name);
            }
        }
        return arr.join(',');
    }

    public back () {
        this.router.navigate(['article']);
    }

}
