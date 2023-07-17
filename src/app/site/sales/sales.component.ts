import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { IPrinterDB, ISale, ISaleItem, ISalePayment, SaleVoid } from './sales.interface';
import { SaleService } from './sales.service';
import { ClientVoid } from './../../admin/records/client/client.interface'
import { CartService } from '../cart/cart.service';
import { TokenStorageService } from 'src/app/tokens/token-storage.service';
import { IProfile } from '../profile/profile.interface';
import { DrawerService } from 'src/app/admin/drawers/drawers.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  user: IProfile = this.tokenService.getUser();
  dataBinding: ISale[] = [];
  saleItem!: ISaleItem[];
  salePayment!: ISalePayment[];

  cancelSale: ISale = SaleVoid;

  constructor(public saleService: SaleService,
             private notifyService: NotificationService,
             public cartService: CartService,
             private tokenService: TokenStorageService,
             public drawerService: DrawerService) { }

  ngOnInit(): void {
    this.saleService.getAll().subscribe((data: ISale[]) => {
      data.forEach(element => {
        if(element.client == null) element.client = ClientVoid;
        if(element.retref) {
          element.isCanceled = true;
          let item = data.find((obj) => { return obj.id === element.retref; });
          if(  item ) { item.isCanceled = true; }

        }
      });
      this.dataBinding = data;
      $.getScript('./assets/js/records/sales.js');
    });
  }

  printItems(sale: ISale) {
    this.saleService.getPrinter(sale.id).subscribe(
      (dataPrinter: IPrinterDB)=>{

        this.cartService.localPrint(dataPrinter).subscribe({
          next: (data: string) => {
            this.notifyService.showSuccess('Reimpresión de ticket existoso', 'Impresora');
          },
          error: (error) => {
            console.log(error);
            this.notifyService.showError(error, 'Impresora');
          }
        });
    });
  }

  getItems(sale: ISale) {
    this.saleService.getItems(sale.id).subscribe(
      (data: ISaleItem[])=>{
        this.saleItem = data;
    });
  }

  getPayments(sale: ISale) {
    this.saleService.getPayments(sale.id).subscribe(
      (data: ISalePayment[])=>{
        this.salePayment = data;
    });
  }

  downloadTicket(sale: ISale) {
    this.saleService.getPdfTicket(sale.id).subscribe(
      (response: any) => {
        var downloadURL = window.URL.createObjectURL(response);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = String(sale.id).padStart(6,'0') + '.pdf';
        link.click();
      }),
      (error: any) => console.log('Error downloading the file')
  }

  getSaleForCancel(sale: ISale) {
    this.cancelSale = Object.assign({}, sale);;
  }

  onCancelSale() {

    let id: number = this.cancelSale.id;

    this.saleService.getItems(id).subscribe({
      next: (items: ISaleItem[])=>{
        this.saleService.getPayments(id).subscribe({
          next: (payments: ISalePayment[])=>{
            items.forEach(item  => {
              item.sale     = item.sale.id as any;
              item.item     = item.item.id as any;
              item.quantity = item.quantity * -1.0;
              item.price    = (Number(item.price) * -1.0).toFixed(2);
              item.total    = (Number(item.total) * -1.0).toFixed(2);
            });

            payments.forEach(payment => {
              payment.total    = (Number(payment.total) * -1.0).toFixed(2);
              payment.cashback = (Number(payment.cashback) * -1.0).toFixed(2);
            });

            this.cancelSale.total     = (this.cancelSale.total * -1.0).toFixed(2) as any;
            this.cancelSale.subtotal  = (this.cancelSale.subtotal * -1.0).toFixed(2) as any;
            this.cancelSale.discount  = (this.cancelSale.discount * -1.0).toFixed(2) as any;
            this.cancelSale.tax       = (this.cancelSale.tax * -1.0).toFixed(2) as any;
            this.cancelSale.quantity  = this.cancelSale.quantity * -1.0;
            this.cancelSale.status    = 'CA';
            this.cancelSale.retref    = this.cancelSale.id;
            this.cancelSale.client    = this.cancelSale.client.id != 0 ? this.cancelSale.client.id : undefined as any;
            this.cancelSale.items     = items as any;
            this.cancelSale.payments  = payments;

            this.saleService.createSale(this.cancelSale as any).subscribe({
              next: (data: ISale) => {
                this.notifyService.showSuccess('Cancelación exitosa', 'Cancelar venta');
              },
              error: (error) => {
                this.notifyService.showError('Error al crear la cancelación', 'Cancelar venta');
              }
            });
          },
          error: (error) => {
            this.notifyService.showError('No se pudo obtener los métodos de pago','Cancelar venta');
          }
        });
      },
      error: (error) => {
        this.notifyService.showError('No se pudo obtener los artículos','Cancelar venta');
      }
    });
  }

}
