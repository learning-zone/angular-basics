import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleTypeModel } from '../model/articletype.model';
import { ArticleTypeListService } from './articletypelist.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './articletypelist.html',
})
export class ArticleTypeListComponent implements OnInit {

  public current_page = 1;
  public per_page = 10;
  public total = 1;
  public dataSet: ArticleTypeModel[] = [];
  public _loading = true;

  public value: any = {};
  public _startDate = '';
  public __endDate = '';

  public options: object[];

  constructor (
    private router: Router,
    private articleListService: ArticleTypeListService,
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
    this.articleListService.getArticleTypeList(this.value)
    .finally(() => { this._loading = false; })
    .subscribe((res: any) => {
        this.dataSet = res.data;
        this.current_page = res.meta.current_page;
        this.total = res.meta.total;
    }, (e) => { });
  }

  public clear () {
    this.value = {
      type_name: {
        val: '',
        exp: 'like',
      },
      remark: {
        val: '',
        exp: 'like',
      },
      created_at: {
        val: '',
        exp: 'between',
      },
    };
  }

  public _startValueChange () {
    console.log(this._startDate, this.__endDate);
    this.__endDate = this._startDate;
  }

}
