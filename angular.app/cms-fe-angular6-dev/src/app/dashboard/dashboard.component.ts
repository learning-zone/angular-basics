import { Component, ElementRef, ViewChild } from '@angular/core';
import { DashBoardService } from './dashboard.service';
import { Echarts } from '@utils/echarts';

// const echarts = require('echarts/lib/echarts');
// 引入中国地图
require('echarts/map/js/china');
require('echarts/lib/component/visualMap');
// 引入提示框和标题组件
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/legend');
require('echarts/lib/component/legend/ScrollableLegendModel');
require('echarts/lib/component/legend/ScrollableLegendAction');
require('echarts/lib/component/legend/ScrollableLegendView');

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html',
})
export class Dashboard {

  @ViewChild('systemChina') public systemChina: ElementRef;

  public source: string = '';
  public sourceType = [{name: '不限', value: ''}, {name: 'v2', value: 'v2'}, {name: 'cms', value: 'cms'}];
  public systemChinaChart: any;

  constructor (private dashBoardService: DashBoardService) {
    //
  }

  public ngOnInit () {
    this.initSystemChinaChart([]);
    this.changedSource();
  }

  // 系统日志统计
  private initSystemChinaChart (list: object[]) {
    this.systemChinaChart = Echarts.init(this.systemChina.nativeElement);
    window.addEventListener('resize', () => {
      this.systemChinaChart.resize();
    });
    const nameMap = {};
    const sysChinaData = list.map((m: any) => {
      nameMap[m.subdivisions_name_en] = m.subdivisions_name_zh;
      return {
        name: m.subdivisions_name_zh,
        value: m.num,
      };
    });
    this.systemChinaChart.setOption({
      title: {
        text: '全国各省访问量',
        x: 'center',
      },
      tooltip: {
      trigger: 'item',
        formatter (obj: any) {
          return `${obj.name}:${obj.value || 0}`;
        },
      },
      visualMap: {
        min: 0,
        max: 1000,
        calculable: true,
        // orient: 'horizontal',
        // left: 'left',
        // top: 'bottom',
        left: '5%',
        bottom: '2%',
        // text: ['High', 'Low'],
        // seriesIndex: [1],
        inRange: {
            color: ['#e0ffff', '#006edd'],
        },
      },
      series: [{
        name: '访问量',
        type: 'map',
        mapType: 'china',
        roam: true,
        label: {
          normal: {
            show: true,
          },
          emphasis: {
            show: true,
          },
        },
        itemStyle: {
          emphasis: {label: {show: true}},
        },
        data: sysChinaData,
        nameMap,
      }],
    });
  }

  //
  public changedSource (): void {
    this.dashBoardService.getSystemLogChina(this.source).subscribe((res: any) => {
      const nameMap = {};
      const sysChinaData = res.data.map((m: any) => {
        nameMap[m.subdivisions_name_en] = m.subdivisions_name_zh;
        return {
          name: m.subdivisions_name_zh,
          value: m.num,
        };
      });
      this.systemChinaChart.setOption({
        title: {
          text: '全国各省访问量',
          x: 'center',
        },
        tooltip: {
        trigger: 'item',
          formatter (obj: any) {
            return `${obj.name}:${obj.value || 0}`;
          },
        },
        visualMap: {
          min: 0,
          max: 1000,
          calculable: true,
          left: '5%',
          bottom: '2%',
          inRange: {
              color: ['#e0ffff', '#006edd'],
          },
        },
        series: [{
          name: '访问量',
          type: 'map',
          mapType: 'china',
          roam: true,
          label: {
            normal: {
              show: true,
            },
            emphasis: {
              show: true,
            },
          },
          itemStyle: {
            emphasis: {label: {show: true}},
          },
          data: sysChinaData,
          nameMap,
        }],
      });
    }, (err) => {});
  }

}
