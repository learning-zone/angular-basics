import { CommonModule }  from '@angular/common';
import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DateTimeRangeModule } from '@components/datetime-picker/datetime-picker.module';
import { SystemLogComponent }  from './systemlog.component';
import { SystemLogListComponent }  from './systemloglist/systemloglist';
import { SystemLogListService }  from './systemloglist/systemloglist.service';
import { SystemLogDetailComponent }  from './systemlogdetail/systemlogdetail';
import { SystemLogDetailService }  from './systemlogdetail/systemlogdetail.service';
import { SystemLogRouting }       from './systemlog.routing';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SystemLogRouting,
    DateTimeRangeModule,
    NgZorroAntdModule.forRoot(),
  ],
  declarations: [
    SystemLogComponent,
    SystemLogListComponent,
    SystemLogDetailComponent,
  ],
  providers: [
    SystemLogListService,
    SystemLogDetailService,
  ],
})
export class SystemLogModule {}
