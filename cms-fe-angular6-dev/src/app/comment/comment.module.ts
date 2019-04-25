import { CommonModule }  from '@angular/common';
import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommentComponent }  from './comment.component';
import { CommentListComponent }  from './commentlist/commentlist';
import { CommentListService }  from './commentlist/commentlist.service';
import { CommentDetailComponent }  from './commentdetail/commentdetail';
import { CommentDetailService }  from './commentdetail/commentdetail.service';
import { CommentRouting }       from './comment.routing';

@NgModule({
  imports: [
    FormsModule,
    // ReactiveFormsModule,
    CommonModule,
    CommentRouting,
    NgZorroAntdModule.forRoot(),
  ],
  declarations: [
    CommentComponent,
    CommentListComponent,
    CommentDetailComponent,
  ],
  providers: [
    CommentListService,
    CommentDetailService,
  ],
})
export class CommentModule {}
