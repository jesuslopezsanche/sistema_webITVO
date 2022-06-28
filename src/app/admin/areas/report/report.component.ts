import { Career, CareerService } from './../../../services/features/career.service';
import { combineLatestWith, switchMap } from 'rxjs';
import { Attendance, AttendanceService } from './../../../services/features/attendance.service';
import { AreaService } from './../../../services/features/area.service';
import { ChartType, ChartEvent } from 'ng-chartist';
import { Component, OnInit } from '@angular/core';
import { IChartistData, IPieChartOptions, plugins } from 'chartist';
import * as Chartist from 'chartist';
import 'chartist-plugin-tooltips';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  chartType: ChartType = 'Pie'
  chartData: IChartistData = { labels: [1], series: [1] }
  careerChartData: IChartistData = { labels: [1], series: [1] }
  event: ChartEvent = {}
  chartOptions: IPieChartOptions = {
    width: '100%', height: '55vh',
    plugins: [Chartist.plugins.tooltip()],
  }
  chart2Options: IPieChartOptions = {
    width: '100%', height: '55vh',
    plugins: [Chartist.plugins.tooltip()],
  }
  startDate: string = ''
  endDate: string = ''
  attendance?: Attendance[]
  careers?: Career[]
  selectedCareer = ''
  labels = [{ name: '', color: '', value: {meta:'', value:0} }]
  data = [{ label: '', size: 0 }]
  constructor(private attendanceService: AttendanceService, private areaService: AreaService, private careerService: CareerService) { }

  ngOnInit(): void {
    this.careerService.getAll().subscribe(r => {
      this.careers = r
      // this.selectedCareer = r[1].id!
    })

    this.areaService.areas.pipe(combineLatestWith(this.attendanceService.getAllAttendancesFromAllAreas()))
      .subscribe(([areas, r]) => {
        console.log({ areas });
        if (!areas) {
          return
        }
        let orderedByArea = areas?.map(area => ({ label: area.name, size: r.filter(a => a.area.id == area.id).length }))
          .sort((a, b) => a.size - b.size)
        console.log({ orderedByArea });
        let sum = orderedByArea!.map(e => e.size).reduce((a, b): number => a + b)
        this.chartData = {
          labels: orderedByArea!.map((r, i) => Math.floor((r.size / sum) * 100) + ' %'),
          series: orderedByArea!.map(r => ({ meta: r.label + ': ', value: r.size })),
        }
        this.labels = (<[string]>this.chartData.labels)
          .map((e: string, i: number) => (
            {
              name: e,
              color: this.getColorClass(i),
              value: <{meta:'',value:0}>this.chartData.series[i]
            }
          ))
        console.log({ labels: this.labels });
        console.log({ data: this.chartData });

        this.attendance = r
        this.data = orderedByArea
      })


  }
  queryDates() {
    this.areaService.areas.subscribe(areas => {
      this.attendanceService.getAllAttendancesInDateFromAllAreas(new Date(this.startDate), new Date(this.endDate)).subscribe(
        r => {
          if (!r || areas?.length == 0) {
            return
          }
          let orderedByArea = areas!.
            map(area => ({ label: area.name, size: r.filter(a => a.area.id == area.id).length }))
            .sort((a, b) => a.size - b.size)
          console.log({ orderedByArea });
          let sum = orderedByArea!.map(e => e.size).reduce((a, b): number => a + b)


          this.chartData = {
            labels: orderedByArea!.map((r, i) => Math.floor((r.size / sum) * 100) + ' %'),
            series: orderedByArea!.map(r => ({ meta: r.label + ': ', value: r.size })),
          }
          this.labels = (<[string]>this.chartData.labels)
          .map((e: string, i: number) => (
            {
              name: e,
              color: this.getColorClass(i),
              value: <{meta:'',value:0}>this.chartData.series[i]
            }
          ))
          this.data = orderedByArea
          this.attendance = r
        }

      )
    })


  }

  filterByCareer() {
    this.areaService.areas.subscribe(areas => {
      console.log(this.selectedCareer);
      console.log(this.attendance);

      let filteredbyCareer = this.attendance?.filter(e => e.student!.career.id == this.selectedCareer)
      console.log({ byCareer: filteredbyCareer });
      let sortingArr = this.data.map(e => e.label)
      let orderedByArea = areas?.map(e => ({ label: e.name, size: filteredbyCareer!.filter(a => a.area.id == e.id).length }))
        .sort((a, b) => sortingArr.indexOf(a.label)-sortingArr.indexOf(b.label))
      let sum = orderedByArea!.map(e => e.size).reduce((a, b): number => a + b)

      this.careerChartData = {
        labels: orderedByArea!.map((r, i) => Math.floor((r.size / sum) * 100) + ' %'),
        series: orderedByArea!.map(r => ({ meta: r.label + ': ', value: r.size })),
      }
      this.data = orderedByArea!
      console.log({ careerData: this.careerChartData });

    })
  }
  getColorClass(i: number) {
    return 'ct-series ct-series-' + String.fromCharCode(97 + i)

  }

}
