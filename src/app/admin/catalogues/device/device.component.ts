import { Component, OnInit } from '@angular/core';
import { IDevice } from './device.interface';
import { DeviceService } from './device.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  dataBinding: IDevice[] = [];

  constructor(public postService: DeviceService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: IDevice[])=>{
    this.dataBinding = data;
    $.getScript('./assets/js/catalogues/devices.js');
  })
  }

}
