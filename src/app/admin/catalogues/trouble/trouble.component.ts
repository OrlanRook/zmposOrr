import { Component, OnInit } from '@angular/core';
import { ITrouble } from './trouble.interface';
import { TroubleService } from './trouble.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-trouble',
  templateUrl: './trouble.component.html',
  styleUrls: ['./trouble.component.scss']
})
export class TroubleComponent implements OnInit {

  dataBinding: ITrouble[] = [];

  constructor(public postService: TroubleService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: ITrouble[])=>{
    this.dataBinding = data;
    $.getScript('./assets/js/catalogues/troubles.js');
  })
  }

}
