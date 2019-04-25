import { Component, OnInit, Input } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { DoubleBallModel } from '../model/doubleball.model';
import { DoubleBallListService } from './doubleballlist.service';

@Component({
  selector: 'app-doubleball-list',
  templateUrl: './doubleballlist.html',
})
export class DoubleBallListComponent implements OnInit {

  public current_page = 1;
  public per_page = 10;
  public total = 1;
  public dataSet: DoubleBallModel[] = [];
  public _loading = true;

  public value: any = {};
  public isVisible = false;
  public isConfirmLoading = false;
  public deleteId: string;

  public options: object[];

  constructor (
    private router: Router,
    private modalService: NzModalService,
    private doubleBallListService: DoubleBallListService,
  ) {
  }

  public ngOnInit () {
    this.clear();
    this.query();
  }

  public add () {
    this._loading = true;
    this.doubleBallListService.addDoubleBall()
      .finally(() => { this._loading = false; })
      .subscribe((res: any) => {
          this.query();
      }, (e) => { });
  }

  public query () {
    this._loading = true;
    this.value.current_page = this.current_page;
    this.value.per_page = this.per_page;
    this.doubleBallListService.getDoubleBallList(this.value)
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
      nzContent: '<b>删除后将无法找回这条信息</b>',
      nzOkLoading: true,
      nzOnOk () {
        return new Promise((resolve) => {
          that.doubleBallListService.deleteDoubleBall(id)
            .finally(() => { resolve(); })
            .subscribe((res: any) => { that.query(); }, (err) => { });
        });
      },
      nzOnCancel () { },
    });
  }

}
