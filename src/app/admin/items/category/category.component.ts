import { Component, OnInit } from '@angular/core';
import { ICategory } from './category.interface';
import { CategoryService } from './category.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  dataBinding: ICategory[] = [];

  constructor(public postService: CategoryService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: ICategory[])=>{
    this.dataBinding = data;
    $.getScript('./assets/js/items/categories.js');
  })
  }

}
