import { Component, OnInit } from '@angular/core';
import { IRepairService } from './repairservice.interface';
import { RepairService } from './repairservice.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-repairservice',
  templateUrl: './repairservice.component.html',
  styleUrls: ['./repairservice.component.scss']
})
export class RepairserviceComponent implements OnInit {

  dataBinding: IRepairService[] = [];

  constructor(public postService: RepairService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: IRepairService[])=>{
    this.dataBinding = data;
    $.getScript('./assets/js/catalogues/repairservices.js');
  })
  }

}
