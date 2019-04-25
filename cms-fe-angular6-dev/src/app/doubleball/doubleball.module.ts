import { CommonModule }  from '@angular/common';
import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { DoubleBallComponent }         from './doubleball.component';
import { DoubleBallListComponent }  from './doubleballlist/doubleballlist';
import { DoubleBallListService }  from './doubleballlist/doubleballlist.service';
import { DoubleBallRouting }       from './doubleball.routing';
import { DoubleBallDirective }       from './doubleballlist/doubleball.directive';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    DoubleBallRouting,
    NgZorroAntdModule.forRoot(),
  ],
  declarations: [
    DoubleBallComponent,
    DoubleBallListComponent,

    DoubleBallDirective,
  ],
  providers: [
    DoubleBallListService,
  ],
})
export class DoubleBallModule {}
