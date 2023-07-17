import { Component, OnInit } from '@angular/core';
import { ICondition } from './condition.interface';
import { ConditionService } from './condition.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss']
})
export class ConditionComponent implements OnInit {

  dataBinding: ICondition[] = [];

  constructor(public postService: ConditionService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: ICondition[])=>{
    this.dataBinding = data;
    $.getScript('./assets/js/catalogues/conditions.js');
  })
  }

}
