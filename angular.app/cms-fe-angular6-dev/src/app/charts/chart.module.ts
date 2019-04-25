import { CommonModule }  from '@angular/common';
import { NgModule }      from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ChartComponent }    from './chart.component';
import { ChartService } from './chart.service';
import { ChartRouting } from './chart.routing';
import { OutletComponent }   from './out-let.component';

@NgModule({
  imports: [
    FormsModule,
    // ReactiveFormsModule,
    CommonModule,
    ChartRouting,
    NgZorroAntdModule.forRoot(),
  ],
  declarations: [
    OutletComponent,
    ChartComponent,
  ],
  providers: [
    ChartService,
  ],
})
export class ChartModule {}
