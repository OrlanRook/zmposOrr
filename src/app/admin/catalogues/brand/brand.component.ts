import { Component, OnInit } from '@angular/core';
import { BrandService } from './brand.service';
import { IBrand } from './brand.interface';

import * as $ from 'jquery';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  dataBinding: IBrand[] = [];

  constructor(public postService: BrandService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: IBrand[])=>{
      this.dataBinding = data;
      $.getScript('./assets/js/catalogues/brands.js');
    })
  }

  removeRow(data: IBrand) {
    console.log(data);
  }

}
