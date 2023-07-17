import { Component, OnInit } from '@angular/core';
import { SaleService } from '../sales/sales.service';
import { IItem } from 'src/app/admin/items/item/item.interface';
import { NotificationService } from 'src/app/notification.service';
import { ISale, ISaleItem, SaleVoid } from '../sales/sales.interface';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  dataBinding:       ISale[] = [];
  saleItem:      ISaleItem[] = [];
  selectedSale:        ISale = SaleVoid;
  searchValue:        string = '';
  filteredCount              = { count: 0 };
  cartNumItems:       number = 0;
  canDelivery:       boolean = false;

  constructor(private saleService: SaleService,
              private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.getSales();
  }

  getSales() {
    this.saleService.getDeliveries().subscribe({
      next: (items: ISale[])=>{
        this.dataBinding = items;
      },
      error: (error) => {
        this.notifyService.showError('No se pudo obtener las ventas pendientes por entregar','Entregas');
      }
    });
  }

  onKeyEscape() {
    this.searchValue = "";
  }


  onClickRow(data: ISale) {
    this.saleService.getItems(data.id).subscribe(
      (data: ISaleItem[])=>{
        this.saleItem = data;

        let cartitems = 0;
        data.forEach(function (x) {
          cartitems += x.quantity;
        });
        this.cartNumItems = cartitems;

        this.canDelivery = true;
    });
    this.selectedSale = data;
  }

  onClickBtnDelivery() {
    this.saleService.updateDeliveries(this.selectedSale, 'SHI').subscribe({
      next: ()=>{
        this.notifyService.showSuccess('Entrega completada','Entregas');
        this.getSales();
        this.canDelivery = false;
        this.saleItem = [];
      },
      error: (error) => {
        this.notifyService.showError('No se pudo actualizar la entrega de la venta','Entregas');
      }
    });

  }

}
