import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BranchVoid, IBranch } from '../../records/branches/branches.interface';
import { ItemService } from '../../items/item/item.service';
import { IInventory, IItem } from '../../items/item/item.interface';
import { ITransfer, ITransferItem } from './transfer.interface';
import { TransferService } from './transfer.service';
import { NotificationService } from 'src/app/notification.service';
import { BranchesService } from '../../records/branches/branches.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  @ViewChild('inputQty', {static: false}) inputQty!: ElementRef<HTMLInputElement>;

  dataTransfers:     ITransfer[] = [];
  branches:            IBranch[] = [];
  currentBranch:         IBranch = BranchVoid;

  dataBinding:           IItem[] = [];
  dataCart:              IItem[] = [];
  dataModalItem!:          IItem;
  inputQuantity:          number = 0;

  pagSize:                number = 10;
  pagPage:                number = 1;
  pagTotal:               number = 0;
  pagMessage:             string = '';

  btnTransferDisable:    boolean = false;

  cartTotal:              number = 0;
  cartNumItems:           number = 0;

  transferComment:        string = '';

  constructor(private itemService: ItemService,
              private transferService: TransferService,
              public notifyService: NotificationService,
              private brachService: BranchesService) { }

  ngOnInit(): void {
    this.itemService.getAll().subscribe((data: IItem[])=>{
      this.dataBinding = data;
    });

    this.updateTable();

    this.brachService.getAll().subscribe({
      next: (items: IBranch[])=>{
        this.branches = items.filter((obj)=> {
          return obj.is_main == 0;
        });
        if( this.branches.length > 0 ) {
          this.currentBranch = this.branches[0];
        }
      },
      error: (error) => {
        this.notifyService.showError('No se pudo obtener las transferencias de mercancia','Transferencia');
      }
    });
  }

  updateTable() {
    this.transferService.getAll().subscribe({
      next: (items: ITransfer[])=>{
        this.dataTransfers = items;
        this.onPageChange();
      },
      error: (error) => {
        this.notifyService.showError('No se pudo obtener las transferencias de mercancia','Transferencia');
      }
    });

  }

  cancelTrasfer() {
    this.dataCart = [];
    this.inputQuantity = 0;
    this.btnTransferDisable = false;
    this.cartTotal = 0;
    this.cartNumItems = 0;
    this.transferComment = '';
    this.calculateTotal();
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
    this.btnTransferDisable = ( cartitems > 0) && this.currentBranch.id != 0;
  }

  inputNumberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode >= 48 && charCode <= 57) {
      return true;
    }
    return false;
  }

  onPageChange() {
    let total = this.dataTransfers.length;
    let begin = (this.pagSize * (this.pagPage-1)) + (total == 0 ? 0: 1);
    let end = total > (begin + this.pagSize -1) ? this.pagSize * this.pagPage : total;
    this.pagMessage = 'Mostrando registros del ' + begin +' al ' + end + ' de un total de ' + total + ' registros';
  }

  pageChangeEvent(event: number){
    this.pagPage = event;
    this.onPageChange();
  }

  makeTransfer() {

    let items: ITransferItem[] = []
    this.dataCart.forEach(function (x) {
      let data: ITransferItem = {
        product:    x.id,
        stock:      x.quantity
      };
      items.push(data);
    });

    let transfer: ITransfer = {
      id:               0,
      branch:           this.currentBranch.id,
      status:           'INI',
      quantity:         String(this.cartNumItems),
      total:            this.cartTotal.toFixed(2),
      notes:            this.transferComment,
      created_date:     '',
      created_by:       '',
      items:            items
    }

    this.transferService.createTransfer(transfer).subscribe({
      next: (items: ITransfer)=>{
        this.notifyService.showSuccess('Transferencia creada existosamente', 'Transferencia');
        this.cancelTrasfer();
        this.updateTable();
      },
      error: (error) => {
        this.notifyService.showError('Error al crear la transferencia','Transferencia');
      }
    });

  }

}
