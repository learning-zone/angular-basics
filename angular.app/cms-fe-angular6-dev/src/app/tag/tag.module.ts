import { CommonModule }  from '@angular/common';
import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AddTagComponent } from './addtag/addtag';
import { AddTagService }  from './addtag/addtag.service';
import { EditTagComponent } from './edittag/edittag';
import { EditTagService }  from './edittag/edittag.service';
import { TagComponent } from './tag.component';
import { TagRouting }       from './tag.routing';
import { TagListComponent } from './taglist/taglist';
import { TagListService } from './taglist/taglist.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    TagRouting,
    NgZorroAntdModule.forRoot(),
  ],
  declarations: [
    TagComponent,
    TagListComponent,
    AddTagComponent,
    EditTagComponent,
  ],
  providers: [
    TagListService,
    AddTagService,
    EditTagService,
  ],
})
export class TagModule {}
