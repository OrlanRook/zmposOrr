import { Component, OnInit } from '@angular/core';
import { IPaymentMethod } from './paymentmethod.interface';
import { PaymentMethodService } from './paymentmethod.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-paymentmethod',
  templateUrl: './paymentmethod.component.html',
  styleUrls: ['./paymentmethod.component.scss']
})
export class PaymentmethodComponent implements OnInit {

  dataBinding: IPaymentMethod[] = [];

  constructor(public postService: PaymentMethodService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: IPaymentMethod[])=>{
    this.dataBinding = data;
    $.getScript('./assets/js/catalogues/paymentmethods.js');
  })
  }

}
