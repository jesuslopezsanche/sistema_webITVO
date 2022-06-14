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
  chartType : ChartType = 'Pie'
  chartData: IChartistData ={labels:[1],series:[1]}
  event: ChartEvent = {}
  chartOptions: IPieChartOptions = { width: '100%', height:'55vh'}
  form: FormGroup
  tabledata = []
  constructor(private programService:ProgramService, private fb:FormBuilder) { 
    this.form = this.fb.group({
      range: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    

    this.programService.getTop('Diario').subscribe( r =>{
      console.log({top: r});
      let labels = r.map(e => e.program.name)
      let series = r.map(e => e.size)
      this.chartData = {labels, series}
      console.log(this.chartData)
      
    }

    )
  }

}
