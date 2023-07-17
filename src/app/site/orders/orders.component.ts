import { Component, OnInit } from '@angular/core';
import { OrderService } from './orders.service';
import { ClientVoid } from './../../admin/records/client/client.interface'

import * as $ from 'jquery';
import { NotificationService } from 'src/app/notification.service';
import { ICartItem } from '../cart/cart.interface';
import { ISale, SaleVoid } from '../sales/sales.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  dataBinding: ISale[] = [];
  orderItem!: ICartItem[];
  currentOrder: ISale = SaleVoid;

  constructor(public orderService: OrderService,
              private notifyService: NotificationService ) { }

  ngOnInit(): void {
    this.orderService.getAll().subscribe((data: ISale[])=>{
      data.forEach(element => {
        if(element.client == null) element.client = ClientVoid;
      });
      this.dataBinding = data;
      $.getScript('./assets/js/records/orders.js');
    });
  }

  setOrder(order: ISale) {
    this.currentOrder = order;
  }
  onDelete() {
    this.orderService.deleteOrder(this.currentOrder).subscribe(()=>{
      this.notifyService.showSuccess("Registro eliminado", "Orden de venta");
    });
  }

  getItems(order: ISale) {
    this.currentOrder = order;
    this.orderService.getItems(order.id).subscribe((data: ICartItem[])=>{
      this.orderItem = data;
    });
  }

  onLaunch() {
    this.orderService.order     = this.currentOrder;
    this.orderService.orderItem = this.orderItem;
  }

  onSendWhatsapp() {
    this.orderService.sendOrderByWhatsapp(this.currentOrder.id).subscribe({
      next: (data: any) => {
        this.notifyService.showSuccess("Cotización enviada correctamente", "Whatsapp");
      },
      error: (error) => {
        this.notifyService.showWarning("Envio de cotización fallida. Vuelva a intentar el envio", "Whatsapp");
      }
    });
  }

  downloadQuote(sale: ISale) {
    this.orderService.getPdfQuote(sale.id).subscribe(
      (response: any) => {
        var downloadURL = window.URL.createObjectURL(response);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = String(sale.id).padStart(6,'0') + '.pdf';
        link.click();
      }),
      (error: any) => console.log('Error downloading the file')
  }

}
