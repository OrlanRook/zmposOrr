import { Component, OnInit } from '@angular/core';
import { ItemService } from './item.service';
import { IItem } from './item.interface';

import * as $ from 'jquery';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  dataBinding: IItem[] = [];

  constructor(public postService: ItemService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: IItem[])=>{
      this.dataBinding = data;
      $.getScript('./assets/js/items/products.js');
    });
  }

}
