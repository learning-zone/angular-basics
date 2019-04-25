import { Component, OnInit } from '@angular/core';
import { TagListService } from './taglist.service';

@Component({
  selector: 'app-tag-list',
  templateUrl: './taglist.html',
})
export class TagListComponent implements OnInit {

  public current_page = 1;
  public per_page = 10;
  public total = 1;
  public dataSet: any = [];
  public _loading = true;

  public value: any = {};

  constructor (
    private tagListService: TagListService,
  ) { }

  public ngOnInit () {
    this.clear();
    this.query();
  }

  public query () {
    this.value.current_page = this.current_page;
    this.value.per_page = this.per_page;
    this._loading = true;
    this.tagListService.getTagList(this.value)
      .finally(() => this._loading = false)
      .subscribe((res: any) => {
        this.dataSet = res.data;
        this.current_page = res.meta.current_page;
        this.total = res.meta.total;
      }, (err: any) => { });
  }

  public clear () {
    this.value = {
      name: {
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
}
