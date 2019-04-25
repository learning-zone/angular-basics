import { Component, OnInit, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { CommentModel } from '../model/comment.model';
import { CommentListService } from './commentlist.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './commentlist.html',
})
export class CommentListComponent implements OnInit {
  // @ViewChild('form') private form: NgForm;
  private timer: number = 0;
  public current_page = 1;
  public per_page = 10;
  public total = 1;
  public dataSet: CommentModel[] = [];
  public _loading = true;

  public value: any = {};
  public isVisible = false;
  public isConfirmLoading = false;
  public deleteId: string;

  public options: object[];

  constructor (
    private router: Router,
    private modalService: NzModalService,
    private commentListService: CommentListService,
  ) {
  }

  public ngOnInit () {
    this.clear();
    this.query();
  }

  public query () {
    // if (cur_page) {
    //   this.current_page = 1;
    // }
    this.value.current_page = this.current_page;
    this.value.per_page = this.per_page;
    this._loading = true;
    // clearTimeout(this.timer);
    // this.timer = setTimeout(() => {
    this.commentListService.getCommentList(this.value)
      .finally(() => { this._loading = false; })
      .subscribe((res: any) => {
        this.dataSet = res.data;
        this.total = res.meta.total;
      }, (e) => { });
    // });
  }

  public clear () {
    this.value = {
      ip: {
        val: '',
        exp: 'like',
      },
      content: {
        val: '',
        exp: 'like',
      },
      client: {
        val: '',
        exp: 'like',
      },
      created_at: {
        val: '',
        exp: 'between',
      },
      article_title: '',
    };
  }

  public delComment (id: string) {
    const that = this;
    this.modalService.confirm({
      nzTitle  : '确认是否删除',
      nzContent: '<b>删除后将无法找回这条评论</b>',
      nzOkLoading: true,
      nzOnOk () {
        return new Promise((resolve) => {
          that.commentListService.deleteComment(id)
            .finally(() => { resolve(); })
            .subscribe((res: any) => { that.query(); }, (err: any) => { });
        });
      },
      nzOnCancel () { },
    });
  }

  public ngDoDestory () {
    clearTimeout(this.timer);
  }

}
