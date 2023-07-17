import { Component, OnInit } from '@angular/core';
import { IReturnType } from './returntype.interface';
import { ReturnTypeService } from './returntype.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-returntype',
  templateUrl: './returntype.component.html',
  styleUrls: ['./returntype.component.scss']
})
export class ReturntypeComponent implements OnInit {

  dataBinding: IReturnType[] = [];

  constructor(public postService: ReturnTypeService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: IReturnType[])=>{
    this.dataBinding = data;
    $.getScript('./assets/js/catalogues/returntypes.js');
  })
  }

}
