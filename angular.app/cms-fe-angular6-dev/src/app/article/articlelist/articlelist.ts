import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { ArticleModel } from '../model/article.model';
import { ArticleListService } from './articlelist.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './articlelist.html',
})
export class ArticleListComponent implements OnInit {

  public current_page = 1;
  public per_page = 10;
  public total = 1;
  public dataSet: ArticleModel[] = [];
  public _loading = true;

  public value: any = {};
  public isVisible = false;
  public isConfirmLoading = false;
  public deleteId: string;

  public options: object[];

  constructor (
    private router: Router,
    private modalService: NzModalService,
    private articleListService: ArticleListService,
  ) {
  }

  public ngOnInit () {
    this.clear();
    this.query();
  }

  public query () {
    this._loading = true;
    this.value.current_page = this.current_page;
    this.value.per_page = this.per_page;
    this.articleListService.getArticleList(this.value)
    .finally(() => { this._loading = false; })
    .subscribe((res: any) => {
      this.dataSet = res.data;
      this.current_page = res.meta.current_page;
      this.total = res.meta.total;
    }, (e) => { });
  }

  public clear () {
  this.value = {
    title: {
      val: '',
      exp: 'like',
    },
    abstract: {
      val: '',
      exp: 'like',
    },
  };
  }

  public delArticle (id: string) {
    const that = this;
    this.modalService.confirm({
      nzTitle  : '确认是否删除',
      nzContent: '<b>删除后将无法找回这篇文章</b>',
      nzOkLoading: true,
      nzOnOk () {
        return new Promise((resolve) => {
          that.articleListService.deleteArticle(id)
            .finally(() => { resolve(); })
            .subscribe((res: any) => { that.query(); }, (err) => { });
        });
      },
      nzOnCancel () { },
    });
  }

  public getPics (url: string) {
    return !!url ? url + '?Authorization-User=' + localStorage.getItem('ACCESS_TOKEN') : '';
  }

}
