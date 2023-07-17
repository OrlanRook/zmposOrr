import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ItemService } from '../../items/item/item.service';
import { NotificationService } from 'src/app/notification.service';
import { IInventory, IItem } from '../../items/item/item.interface';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  @ViewChild('inputQty', {static: false}) inputQty!: ElementRef<HTMLInputElement>;

  dataBinding:           IItem[] = [];
  dataCart:              IItem[] = [];
  dataModalItem!:          IItem;
  inputQuantity:          number = 0;

  inputOffset:            number = 0;
  inputCopies:            number = 1;

  btnGenDisable:         boolean = false;

  cartTotal:              number = 0;
  cartNumItems:           number = 0;

  constructor(private itemService: ItemService,
              public notifyService: NotificationService) { }

  ngOnInit(): void {
    this.itemService.getAll().subscribe((data: IItem[])=>{
      this.dataBinding = data;
    });
  }

  cancelTrasfer() {
    this.dataCart = [];
    this.inputQuantity = 0;
    this.btnGenDisable = false;
    this.cartTotal = 0;
    this.cartNumItems = 0;
  }

  addToCart(item: IItem) {
    var isPresent = this.dataCart.some(function (x: IItem) { return x.id === item.id });
    var stock = this.getStock(item);
    if( stock ) {
      if(isPresent == false && stock > 0)
      {
        this.setStock(item, -1);
        item.quantity = 1;
        item.disc_total = 0;
        this.dataCart.push(item);

        this.calculateTotal();
      }
    }
  }

  getStock(item: IItem) {
    const inventory = item.product_stock.find((obj:IInventory) => { return obj.branch === 1 });
    return inventory?.stock;
  }

  setStock(item: IItem, quantity: number) {
    var inventory = item.product_stock.find((obj:IInventory) => { return obj.branch === 1 });
    if( inventory ) {
      inventory.stock += quantity;
    }
  }

  addQtyFromModal() {
    let item: IItem = this.dataModalItem;
    if (this.dataCart.includes(item)) {
      let qty: number = Number(this.inputQuantity);
      this.setStock(item, +this.dataCart[this.dataCart.indexOf(item)].quantity);
      this.setStock(item, -qty);
      this.dataCart[this.dataCart.indexOf(item)].quantity = qty;
    }
    this.calculateTotal();
  }

  updateQtyModal(item: IItem) {
    this.dataModalItem = item;
    this.inputQuantity = this.dataCart[this.dataCart.indexOf(item)].quantity;
    setTimeout(()=>{
      this.inputQty.nativeElement.focus();
      this.inputQty.nativeElement.select();
      },100)
  }

  removeUnit(item: IItem) {
    // Check if item is in array
    if (this.dataCart.includes(item)) {
      // Splice the element out of the array
      this.setStock(item, +item.quantity);
      const index = this.dataCart.indexOf(item);
      if (index > -1) {
        // Set item quantity back to 1 (thus when readded, quantity isn't 0)
        this.dataCart[this.dataCart.indexOf(item)].quantity = +1;
        this.dataCart.splice(index, 1);
      }
    }
    this.calculateTotal();
  }

  calculateTotal() {
    let total = 0;
    let cartitems = 0;

    // Cart item counter
    this.dataCart.forEach(function (x) {
      cartitems += x.quantity;
    });

    // Iterate over all items
    this.dataCart.forEach(function (x) {
      total += (x.branch * x.quantity);
    });
    this.cartTotal = total;
    this.cartNumItems = cartitems;
    this.btnGenDisable = ( cartitems > 0);
  }

  inputNumberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode >= 48 && charCode <= 57) {
      return true;
    }
    return false;
  }

  generate(){
    this.itemService.createLabel(this.dataCart, this.inputOffset, this.inputCopies ).subscribe(
      (response: any) => {
        var downloadURL = window.URL.createObjectURL(response);
        var link = document.createElement('a');
        link.href = downloadURL;
        let now = formatDate(Date.now(),'yyyyMMdd_hhmmss', 'en-US');
        link.download = 'Labels_'+ now +  + '.pdf';
        link.click();

        this.cancelTrasfer();
      }),
      (error: any) => console.log('Error downloading the file')
  }

}
