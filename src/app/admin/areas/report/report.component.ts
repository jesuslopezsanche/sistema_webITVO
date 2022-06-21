import { Career, CareerService } from './../../../services/features/career.service';
import { combineLatestWith, switchMap } from 'rxjs';
import { Attendance, AttendanceService } from './../../../services/features/attendance.service';
import { AreaService } from './../../../services/features/area.service';
import { ChartType, ChartEvent } from 'ng-chartist';
import { Component, OnInit } from '@angular/core';
import { IChartistData, IPieChartOptions } from 'chartist';

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
    labelInterpolationFnc: (val: any, i: number) => {
      let sum = (<number[]>this.chartData.series)
        .reduce((a: any, b: any) => {
          return a + b
        })
      return val + ': ' + (Math.round((<number>this.chartData.series[i] / sum) * 100)) + '%'
    }
  }
  chart2Options: IPieChartOptions = {
    width: '100%', height: '55vh',
    labelInterpolationFnc: (val: any, i: number) => {
      let sum = (<number[]>this.careerChartData.series)
        .reduce((a: any, b: any) => {
          return a + b
        })
      return val + ': ' + (Math.round((<number>this.careerChartData.series[i] / sum) * 100)) + '%'
    }
  }
  startDate: string = ''
  endDate: string = ''
  attendance?: Attendance[]
  careers?: Career[]
  selectedCareer = ''
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

        this.chartData = {
          labels: orderedByArea!.map(r => r.label),
          series: orderedByArea!.map(r => r.size ? r.size : 0.01),
        }
        this.attendance = r
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


          this.chartData = {
            labels: orderedByArea!.map(r => r.label),
            series: orderedByArea!.map(r => r.size ? r.size : 0.01),
          }
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
      let orderedByArea = areas?.map(e => ({ label: e.name, size: filteredbyCareer!.filter(a => a.area.id == e.id).length }))
        .sort((a, b) => a.size - b.size)
      this.careerChartData = {
        labels: orderedByArea!.map(r => r.label),
        series: orderedByArea!.map(r => r.size ? r.size : 0.01),
      }
      console.log({ careerData: this.careerChartData });

    })
  }

}
