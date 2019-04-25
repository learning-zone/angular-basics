import { Component, OnInit } from '@angular/core';
import { UserListService } from './userlist.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './userlist.html',
})
export class UserListComponent implements OnInit {

  public current_page = 1;
  public per_page = 10;
  public total = 1;
  public dataSet: any = [];
  public _loading = true;

  public value: any = {};
  public isVisible = false;
  public isConfirmLoading = false;
  public deleteId: string;

  constructor (
    private userListService: UserListService,
    ) {
  }

  public ngOnInit () {
    this.clear();
    this.query();
  }

  public query () {
    this.value.current_page = this.current_page;
    this.value.per_page = this.per_page;
    this._loading = true;
    this.userListService.getUserList(this.value)
    .finally(() => { this._loading = false; })
    .subscribe((res: any) => {
      this.dataSet = res.data;
      this.current_page = res.meta.current_page;
      this.total = res.meta.total;
    }, (err: any) => { });
  }

  public clear () {
    this.value = {
      username: {
        val: '',
        exp: 'like',
      },
      nick_name: {
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

  public delUser (id: string) {
    if (id) {
      this.deleteId = id;
      this.isVisible = true;
    } else {
      this.isConfirmLoading = true;
      this.userListService.deleteUser(this.deleteId).subscribe((res: any) => {
        this.isVisible = false;
        this.query();
        this.isConfirmLoading = false;
      }, (err: any) => {
        this.isConfirmLoading = false;
      });
    }
  }
}
