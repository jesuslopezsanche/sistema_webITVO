import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AreaService } from './../../../services/features/area.service';
import { MaterialService } from './../../../services/features/material.service';
import { ProgramService } from './../../../services/features/program.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ChartEvent, ChartOptions, ChartType } from 'ng-chartist';
import { IChartistData, IPieChartOptions } from 'chartist';

@Component({
  selector: 'app-top-materials',
  templateUrl: './top-materials.component.html',
  styleUrls: ['./top-materials.component.css']
})
export class TopMaterialsComponent implements OnInit {
  chartType: ChartType = 'Pie'
  chartData: IChartistData = { labels: [1], series: [1] }
  event: ChartEvent = {}
  chartOptions: IPieChartOptions = {
    width: '100%', height: '55vh',
    labelInterpolationFnc: (val: any, i: number) => {
      let sum = (<number[]>this.chartData.series)
        .reduce((a: any, b: any) => {
          return a + b
        })
      return val + ': '+ (Math.round((<number>this.chartData.series[i] / sum ) * 100)) + '%'
    }
  }
  form: FormGroup
  tabledata = []
  constructor(
    private programService: ProgramService,
    private materialService: MaterialService,
    private areaService: AreaService,
    private fb: FormBuilder,
    private route: ActivatedRoute

  ) {
    this.form = this.fb.group({
      range: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(switchMap(e => this.areaService.getById(e.get('areaId')!)),
      switchMap(e => {
        if (e.computers)
          return this.programService.getTop('Diario')
        return this.materialService.getTop('Diario')
      })).subscribe(r => {
        console.log({ top: r });
        let labels = r.map(e => e.program.name)
        let series = r.map(e => e.size < 1 ? 0.1 : e.size)
        this.chartData = { labels, series }
        console.log(this.chartData)

      }

      )
  }

}
