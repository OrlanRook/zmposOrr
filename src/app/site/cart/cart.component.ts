import { Component, ElementRef, OnInit, ViewChild, Input} from '@angular/core';
import { ItemService } from 'src/app/admin/items/item/item.service';
import { IItem, INewItem, PRICE } from 'src/app/admin/items/item/item.interface';
import { TokenStorageService } from 'src/app/tokens/token-storage.service';
import { IProfile } from '../profile/profile.interface';
import { IInventory } from './../../admin/items/item/item.interface';
import { ClientService } from 'src/app/admin/records/client/client.service';
import { IClient } from 'src/app/admin/records/client/client.interface';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { CartService } from './cart.service';
import { NotificationService } from 'src/app/notification.service';
import { ICartItem} from './cart.interface';
import { OrderService } from '../orders/orders.service';
import { IPrinterDB, ISale, ISaleItem, ISaleItemRaw, ISalePayment, ISaleRaw, SaleVoid } from '../sales/sales.interface';
import { DrawerVoid, IDrawer } from 'src/app/admin/drawers/drawers.interface';
import { ProfileService } from '../profile/profile.service';
import { SaleService } from '../sales/sales.service';
import { CategoryService } from 'src/app/admin/items/category/category.service';
import { ILine } from 'src/app/admin/items/category/category.interface';

const numItemAsWholesales = 10;
const DRAWER_UNKNOW       = 0;
const DRAWER_CLOSE        = 1;
const DRAWER_OPEN         = 2;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {

  @ViewChild('psLeft') psLeft!: PerfectScrollbarDirective;
  @ViewChild('inputQty', {static: false}) inputQty!: ElementRef<HTMLInputElement>;
  @ViewChild('closeModalPay') private closeModalPay!: ElementRef;

  isDrawerOpen:      number  = DRAWER_UNKNOW;
  currentDrawer:     IDrawer = DrawerVoid;

  dataBinding:       IItem[] = [];
  dataCart:          IItem[] = [];
  dataClient:      IClient[] = [];
  dataPayment:ISalePayment[] = [];
  dataModalItem!:      IItem;
  user:             IProfile = this.tokenService.getUser();
  cartTotal:          number = 0;
  cartTotalBase:      number = 0;
  cartNumItems:       number = 0;
  searchValue:        string = '';
  filteredCount              = { count: 0 };
  inputQuantity:      number = 0;       // Modal: Cantidad de articulos ingresados por cajero
  inputNotes:         string = '';      // Modal: Notas cuando guardas la venta (boton Guardar)

  currentClientList:  number = 0;
  currentClient?:    IClient = undefined;
  currentClientName:  string = '';
  isWholesaleRule:   boolean = false;

  btnIsDisable:      boolean = true;    // Botones Pagar, Guardar y Cancelar
  btnCanPaid:        boolean = false;   // Modal: Validaciones antes de pagar
  btnCanPrint:       boolean = false;   // Modal: Imprimir después de pagar
  btnCanAddPayment:  boolean = true;    // Modal: Puede agregar metodo de pago

  inputPendingAmout:  string = '0.0';
  inputCashAmount:    string = '';      // Modal: Cantidad que paga el cliente (cash)
  inputCashback:      string = '0.0'    // Modal: Cambio

  inputPayAmount:     string = '';      // Modal: Cantidad que paga el cliente
  inputPayReference:  string = '';      // Modal: Referencia de pago con tarjeta/transferencia

  isPaid:            boolean = false;

  selectedPaymentMethod: string = 'CC';   // Modal: Método de pago elegido

  currentTicket:      string = '';

  currentOrder:       ISale = SaleVoid;
  currentOrderItems: ICartItem[] = [];

  newSelectLine:     ILine[] = []
  newSelectSubLine1: ILine[] = []
  newSelectSubLine2: ILine[] = []
  newSelectedLine!:    ILine;
  newSelectedSubLine1!:ILine;
  newSelectedSubLine2!:ILine;
  newShortName:       string = '';
  newSku:             string = '';
  newCode:            string = '00000';
  newDescription:     string = '';
  newPrice:           string = '';
  newStock:           string = '1';

  discPerceSelected:   string = '';
  discPerceDisable:  boolean  = false;
  discAmoutSelected:   string = '';
  discAmountDisable:  boolean = true;
  discAmountCalculated: number = 0;
  discString1:         string = '';
  discString2:         string = '';
  discString3:         string = '';
  discDisableApply:   boolean = true;
  discGlobalDisc:      number = 0;

  constructor(public itemService: ItemService, 
              public clientService: ClientService,
              public cartService: CartService,
              private notifyService: NotificationService,
              public orderService: OrderService,
              private tokenService: TokenStorageService,
              private profileService: ProfileService,
              public saleService: SaleService,
              public categoryService: CategoryService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.profileService.getProfile(this.user.id).subscribe((data:IProfile) => {
        if( data.drawer ) {
          this.isDrawerOpen = DRAWER_OPEN;
          this.currentDrawer = data.drawer;
          this.loadDataWhenIsOpen();
        }
        else {
          this.isDrawerOpen = DRAWER_CLOSE;
        }
      });
    }, 220);
  }

  loadDataWhenIsOpen() {
    this.itemService.getAll().subscribe((data: IItem[])=>{
      this.dataBinding = data;

      // Recover Order Sale
      if( this.orderService.orderItem !== undefined ) {

        this.currentOrderItems = this.orderService.orderItem;
        
        this.orderService.orderItem.forEach(item => {
          let itemSource = this.dataBinding.find((obj) => {
            return obj.id === item.item.id;
          });

          if(itemSource) {
            itemSource.quantity = item.quantity;
            this.dataCart.push(itemSource);
            this.setStock(itemSource, -item.quantity);
          }
        });
        this.calculateTotal();
      }
    });

    this.clientService.getAll().subscribe((data: IClient[])=>{
      this.dataClient = data.sort((a, b) => a.name.localeCompare(b.name));
      
      // Recover Client Sale
      if( this.orderService.order !== undefined ) {

        this.currentTicket = '#' + String(this.orderService.order.id).padStart(5 ,"0");
        this.currentOrder = this.orderService.order;
        this.inputNotes = this.orderService.order.notes;

        let client = this.dataClient.find((obj) => {
          return obj.id === this.orderService.order?.client?.id;
        });
        if( client ) {
          this.currentClient = client;
          this.currentClientName = client.name;
          this.onChangeClient(client.name);
        }
      }
    });
  }

  onKeyEscape() {
    this.searchValue = "";
  }

  onKeyEscapeClient() {
    this.currentClientName = '';
    this.onChangeClient('');
  }

  onChangeClient(newClient: string) {
    var self = this;
    this.currentClient = this.dataClient.find((v) => v.name == newClient);
    this.calculateTotal();
  }

  onChangePayAmount(event: Event) {
    this.validatePayments();
  }

  applyFilter(event: Event) {
    this.psLeft.scrollToTop();
  }

  inputNumberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode >= 48 && charCode <= 57) {
      return true;
    }
    return false;
  }
  
  inputCurrencyOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if( (charCode >= 48 && charCode <= 57) || charCode == 46) {
      return true;
    }
    return false;
  }

  getStock(item: IItem) {
    const inventory = item.product_stock.find((obj:IInventory) => { return obj.branch === this.currentDrawer.branch; });
    return inventory?.stock;
  }

  setStock(item: IItem, quantity: number) {
    var inventory = item.product_stock.find((obj:IInventory) => { return obj.branch === this.currentDrawer.branch; });
    if( inventory ) {
      inventory.stock += quantity;
    }
  }

  getPrice(item: IItem) {
    var price = PRICE.PUBLIC;
    let minPrice = item.price * 1.16 * 1.10;

    this.currentClientList = this.currentClient ? this.currentClient.type : 0;

    if( this.isWholesaleRule ) { // Bussines Rule
      price = item.wholesale;
    }
    else if( PRICE.PUBLIC == this.currentClientList){
      price = item.public;
    }
    else if( PRICE.TECHNICIAN == this.currentClientList){
      price = item.technician;
    }
    else if( PRICE.WHOLESALE == this.currentClientList){
      price = item.wholesale;
    }
    else if( PRICE.DISTRIBUTOR == this.currentClientList){
      price = item.distributor;
    }
    else if( PRICE.BRANCH == this.currentClientList){
      price = item.branch;
    }

    price = price - item.disc_total;

    if(price <= minPrice){
      price = minPrice;
    }

    item.isNewPrice = (price != item.public);

    return price;
  }

  calculateTotal() {
    var self = this;
    let total = 0;
    let totalBase = 0;
    let cartitems = 0;

    // Cart item counter
    this.dataCart.forEach(function (x) {
      cartitems += x.quantity;
    });

    // Bussines Rule: After 10 items a wholesale is applied
    this.isWholesaleRule = (cartitems >= numItemAsWholesales);

    // Iterate over all items
    this.dataCart.forEach(function (x) {
      total += (self.getPrice(x) * x.quantity);
      totalBase += (x.public * x.quantity);
    });
    this.cartTotal = total;
    this.cartTotalBase = totalBase;
    this.cartNumItems = cartitems;
    this.btnIsDisable = !( total > 0);
  }

  addToCart(item: IItem){
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

  updateQtyModal(item: IItem) {
    this.dataModalItem = item;
    this.inputQuantity = this.dataCart[this.dataCart.indexOf(item)].quantity;
    setTimeout(()=>{
      this.inputQty.nativeElement.focus();
      this.inputQty.nativeElement.select();
      },100)
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

  increaseUnit(item: IItem) {
    if (this.dataCart.includes(item)) {
      this.setStock(item, -1);
      let clientType = this.currentClient ? this.currentClient.type : 0;
      let localItem  = this.dataCart[this.dataCart.indexOf(item)];
      localItem.quantity += 1;

    } else {
      this.dataCart.push(item);
    }
    this.calculateTotal();
  }
  
  reduceUnit(item: IItem) {
    if (this.dataCart[this.dataCart.indexOf(item)].quantity === 1) {
      this.removeUnit(item);
    }
    else {
      let clientType = this.currentClient ? this.currentClient.type : 0;
      let localItem = this.dataCart[this.dataCart.indexOf(item)];
      localItem.quantity -= 1;
      this.setStock(item, +1);
    }
    this.calculateTotal();
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

  cancelCart() {
    var self = this;
    this.dataCart.forEach(function (x) {
      self.setStock(x, x.quantity);
      x.isNewPrice = false;
    });
    this.dataCart = [];
    this.calculateTotal();
    this.onKeyEscapeClient();
    this.searchValue = '';
    this.currentOrder = SaleVoid;
    this.currentOrderItems = []
    this.inputNotes = '';
    this.currentClient = undefined;
    this.currentClientName = '';
    this.currentTicket = '';
    this.orderService.order     = SaleVoid;
    this.orderService.orderItem = [];
  }

  saveCart() {
    let status = 'IP';

    let items:ISaleItemRaw[] = [];
    this.dataCart.forEach(item => {
      let newItem:ISaleItemRaw = {
        id:             0,
        sale:           0,
        item:           item.id,
        branch:         this.currentDrawer.branch,
        drawer:         this.currentDrawer.id,
        returns:        0,
        quantity:       item.quantity,
        base:           String(item.public),
        price:          String(this.getPrice(item)),
        total:          (item.quantity * this.getPrice(item)).toFixed(2),
        disc_total:     item.disc_total,
        disc_minimum:   item.disc_minimum,
        disc_percent:   item.disc_percent,
        disc_amount:    item.disc_amount
      }
      items.push(newItem);
    });


    let subtotal = this.cartTotalBase / 1.16;
    let discount = subtotal - (this.cartTotal / 1.16);
    let tax      = (subtotal - discount) * 0.16;

    let sale: ISaleRaw = {
      id:             this.currentOrder.id,
      client:         this.currentClient ? this.currentClient.id: undefined,
      branch:         this.currentDrawer.branch,
      drawer:         this.currentDrawer.id,
      total:          this.cartTotal.toFixed(2),
      subtotal:       subtotal.toFixed(2),
      discount:       discount.toFixed(2),
      tax:            tax.toFixed(2),
      quantity:       this.cartNumItems,
      status:         status,
      type:           'ORD',
      notes:          this.inputNotes,
      created_date:   '',
      items:          items,
      payments:       [],
      retref:         undefined
    }

    if( this.currentOrder.id == 0 )
    {
      this.saleService.createSale(sale).subscribe({

        next: (data: ISale) => {

          this.currentTicket = '#' + String(data.id).padStart(5 ,"0");
          this.notifyService.showSuccess('Órden creada ' + this.currentTicket, 'Órden');
            this.cancelCart();
        },
        error: (error) => {
          this.notifyService.showError(error, 'Error al crear órden');
        }
      });
    }
    else
    {
      sale.type = 'ORD'
      this.saleService.updateSale(sale).subscribe({

        next: (data: ISale) => {

          this.saleService.getItems(data.id).subscribe({

            next: (saleItems: ISaleItem[]) => {

              saleItems.forEach(item => {
                this.saleService.deleteSaleItem(data.id, item.id).subscribe({});
              });

              let items:ISaleItemRaw[] = [];
              this.dataCart.forEach(item => {
                let newItem:ISaleItemRaw = {
                  id:             0,
                  sale:           data.id,
                  item:           item.id,
                  branch:         this.currentDrawer.branch,
                  drawer:         this.currentDrawer.id,
                  returns:        0,
                  quantity:       item.quantity,
                  base:           String(item.public),
                  price:          String(this.getPrice(item)),
                  total:          (item.quantity * this.getPrice(item)).toFixed(2),
                  disc_total:     item.disc_total,
                  disc_minimum:   item.disc_minimum,
                  disc_percent:   item.disc_percent,
                  disc_amount:    item.disc_amount
                }
                items.push(newItem);
              });
              this.saleService.createSaleItem(data.id, items).subscribe((items: ISaleItemRaw[])=>{
                this.currentTicket = '#' + String(data.id).padStart(5 ,"0");
                this.notifyService.showSuccess('Órden actualizada ' + this.currentTicket, 'Órden');
                this.cancelCart();
              });
            },
            error: (error) => {
              this.notifyService.showError(error, 'Error al actualizar órden');
            }
          });
        },
        error: (error) => {
          this.notifyService.showError(error, 'Error al actualizar órden');
        }
      });
    }
  }

  payCancel() {
    this.inputCashAmount    = '';
    this.inputCashback      = '0.0';
    this.inputPayAmount     = '';
    this.inputPayReference  = '';
    this.btnCanPaid         = false;
    this.btnCanPrint        = false;
    
    if( this.isPaid ) {
      this.isPaid           = false;
      this.dataPayment      = [];
      this.cancelCart();
    }
  }

  payCart() {
    let status = 'IP';
    if( ['CA','CC','TR'].includes(this.selectedPaymentMethod) ){
      status = 'CO';
    }

    let items:ISaleItemRaw[] = [];
    this.dataCart.forEach(item => {
      let newItem:ISaleItemRaw = {
        id:             0,
        sale:           0,
        item:           item.id,
        branch:         this.currentDrawer.branch,
        drawer:         this.currentDrawer.id,
        returns:        0,
        quantity:       item.quantity,
        base:           String(item.public),
        price:          String(this.getPrice(item)),
        total:          (item.quantity * this.getPrice(item)).toFixed(2),
        disc_total:     item.disc_total,
        disc_minimum:   item.disc_minimum,
        disc_percent:   item.disc_percent,
        disc_amount:    item.disc_amount
      }
      items.push(newItem);
    });

    if( this.inputCashAmount != '' && Number(this.inputCashAmount) != 0) {
      let newPayment:ISalePayment = {
        id:             0,
        sale:           0,
        method:         'CA',
        branch:         this.currentDrawer.branch,
        drawer:         this.currentDrawer.id,
        reference:      '',
        total:          Number(this.inputCashAmount).toFixed(2),
        cashback:       Number(this.inputCashback).toFixed(2),
        created_date:   ''
      };
      this.dataPayment.unshift(newPayment);
    }

    let subtotal = this.cartTotalBase / 1.16;
    let discount = subtotal - (this.cartTotal / 1.16);
    let tax      = (subtotal - discount) * 0.16;

    let sale: ISaleRaw = {
      id:             this.currentOrder.id,
      client:         this.currentClient ? this.currentClient.id: undefined,
      branch:         this.currentDrawer.branch,
      drawer:         this.currentDrawer.id,
      total:          this.cartTotal.toFixed(2),
      subtotal:       subtotal.toFixed(2),
      discount:       discount.toFixed(2),
      tax:            tax.toFixed(2),
      quantity:       this.cartNumItems,
      status:         status,
      type:           'BAS',
      notes:          '',
      created_date:   '',
      items:          items,
      payments:       this.dataPayment,
      retref:         undefined
    }
    this.isPaid       = true;

    if( this.currentOrder.id == 0 )
    {
      this.saleService.createSale(sale).subscribe({

        next: (data: ISale) => {

          this.currentTicket = '#' + String(data.id).padStart(5 ,"0");
          this.notifyService.showSuccess('Pago registrado ' + this.currentTicket, 'Compra');

          this.saleService.getPrinter(data.id).subscribe(
            (dataPrinter: IPrinterDB)=>{
              this.cartService.localPrint(dataPrinter).subscribe({
                next: (data: any) => {
                  this.closeModalPay.nativeElement.click(); 
                  this.cancelCart();
                },
                error: (error) => {
                  console.log(error);
                  let arr = error.split('&nbsp;');
                  let code = Number(arr[0]);

                  if( code == 0)
                    this.notifyService.showError("Servidor de impresión no disponible (printerPOS).", 'Error al imprimir');
                  else
                    this.notifyService.showError(error, 'Error al imprimir');
                }
              });
          });

          this.btnCanPaid   = false;
          this.btnCanPrint  = true;
        },
        error: (error) => {
          this.notifyService.showError(error, 'Error al pagar');
        }
      });
    }
    else
    {
      sale.type = 'ORD'
      this.saleService.updateSale(sale).subscribe({

        next: (data: ISale) => {

          this.saleService.getItems(data.id).subscribe({

            next: (saleItems: ISaleItem[]) => {

              saleItems.forEach(item => {
                this.saleService.deleteSaleItem(data.id, item.id).subscribe({});
              });

              let items:ISaleItemRaw[] = [];
              this.dataCart.forEach(item => {
                let newItem:ISaleItemRaw = {
                  id:             0,
                  sale:           data.id,
                  item:           item.id,
                  branch:         this.currentDrawer.branch,
                  drawer:         this.currentDrawer.id,
                  returns:        0,
                  quantity:       item.quantity,
                  base:           String(item.public),
                  price:          String(this.getPrice(item)),
                  total:          (item.quantity * this.getPrice(item)).toFixed(2),
                  disc_total:     item.disc_total,
                  disc_minimum:   item.disc_minimum,
                  disc_percent:   item.disc_percent,
                  disc_amount:    item.disc_amount
                }
                items.push(newItem);
              });
              this.saleService.createSaleItem(data.id, items).subscribe((items: ISaleItemRaw[])=>{
                this.payCartCommonPayment(data);
              });
            },
            error: (error) => {
              this.notifyService.showError(error, 'Error al actualizar órden');
            }
          });
        },
        error: (error) => {
          this.notifyService.showError(error, 'Error al actualizar órden');
        }
      });
    }
  }

  payCartCommonPayment(data: ISale) {
    this.dataPayment.forEach(payment => {
      payment.sale = data.id;
    });
    this.saleService.createSalePayment(data.id, this.dataPayment).subscribe((payments: ISalePayment[]) => {

      this.currentTicket = '#' + String(data.id).padStart(5 ,"0");
      this.notifyService.showSuccess('Pago registrado ' + this.currentTicket, 'Compra');

      this.saleService.getPrinter(data.id).subscribe(
        (dataPrinter: IPrinterDB)=>{

          this.cartService.localPrint(dataPrinter).subscribe({
            next: (data: any) => {
              this.closeModalPay.nativeElement.click(); 
              this.cancelCart();
            },
            error: (error) => {
              let arr = error.split('&nbsp;');
              let code = Number(arr[0]);

              if( code == 0)
                this.notifyService.showError("Servidor de impresión no disponible (printerPOS).", 'Error al imprimir');
              else
                this.notifyService.showError(error, 'Error al imprimir');
            }
          });
      });
    });
  }

  validatePayments() {

    let others: number = 0;

    this.dataPayment.forEach(payment => {
      others += Number(payment.total);
    });

    others += Number(this.inputCashAmount)

    if( Number(this.inputCashAmount) >= this.cartTotal ) {
      this.btnCanPaid = true;
      let cashback: number = Number(this.inputPayAmount) - this.cartTotal;
      this.inputCashback = (cashback).toFixed(2);
    }
    else {
      this.btnCanPaid = false;
      this.inputCashback = '0.0'
    }

    let pendig = Number(others) - Number(this.cartTotal);

    if( pendig >= 0 ) {
      this.inputPendingAmout = '0.0';
      this.inputCashback = (pendig).toFixed(2);
      this.btnCanPaid = true;
    }
    else {
      this.inputPendingAmout = (-pendig).toFixed(2);
    }
  }

  startPayment() {
    this.inputPendingAmout = (this.cartTotal).toFixed(2);
  }

  startPaymentMethod() {
    this.inputPayReference = '';
    this.inputPayAmount = this.inputPendingAmout;

  }

  addPayment() {
    let newPayment:ISalePayment = {
      id:             0,
      sale:           0,
      method:         this.selectedPaymentMethod,
      branch:         this.currentDrawer.branch,
      drawer:         this.currentDrawer.id,
      reference:      this.inputPayReference,
      total:          Number(this.inputPayAmount).toFixed(2),
      cashback:       '0.0',
      created_date:   ''
    }

    this.dataPayment.push(newPayment);
    this.validatePayments();

  }

  newModalItem() {
    this.categoryService.getLine().subscribe({
      next: (data: ILine[]) => {
        this.newSelectLine = data;
        this.newSelectedLine = data.find((obj) => {return obj.code === '99'})!;

        this.categoryService.getSubLine1().subscribe({
          next: (data1: ILine[]) => {
            this.newSelectSubLine1 = data1;
            this.newSelectedSubLine1 = data1.find((obj) => {return obj.code === '9999'})!;

            this.categoryService.getSubLine2().subscribe({
              next: (data2: ILine[]) => {
                this.newSelectSubLine2 = data2;
                this.newSelectedSubLine2 = data2.find((obj) => {return obj.code === '999'})!;

                let baseCode: string = (this.newSelectedLine.code + this.newSelectedSubLine1.code.slice(-2) + this.newSelectedSubLine2.code).trim();
                this.newShortName = (this.newSelectedLine.shortname + ' ' + this.newSelectedSubLine1.shortname + ' ' + this.newSelectedSubLine2.shortname).trim();
                this.newSku = (baseCode + this.newCode).trim();

                this.categoryService.getCode(baseCode).subscribe({
                  next: (code: string) => {
                    this.newSku  = code;
                    this.newCode = code.replace(baseCode,'');
                  }
                });
              },
              error: (error) => {
                this.notifyService.showError(error, 'Error al obtener la sub línea 2');
              }
            });

          },
          error: (error) => {
            this.notifyService.showError(error, 'Error al obtener la sub línea 1');
          }
        });

      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al obtener la categoría');
      }
    });
  }

  onChangeLine(newValue: ILine) {
    this.newSelectedLine = newValue;
    let baseCode: string = (this.newSelectedLine.code + this.newSelectedSubLine1.code.slice(-2) + this.newSelectedSubLine2.code).trim();
    this.newShortName = (this.newSelectedLine.shortname + ' ' + this.newSelectedSubLine1.shortname + ' ' + this.newSelectedSubLine2.shortname).trim();
    this.newSku = (baseCode + this.newCode).trim();

    this.categoryService.getCode(baseCode).subscribe({
      next: (code: string) => {
        this.newSku  = code;
        this.newCode = code.replace(baseCode,'');
      }
    });
  }

  onChangeSubLine1(newValue: ILine) {
    this.newSelectedSubLine1 = newValue;
    let baseCode: string = (this.newSelectedLine.code + this.newSelectedSubLine1.code.slice(-2) + this.newSelectedSubLine2.code).trim();
    this.newShortName = (this.newSelectedLine.shortname + ' ' + this.newSelectedSubLine1.shortname + ' ' + this.newSelectedSubLine2.shortname).trim();
    this.newSku = (baseCode + this.newCode).trim();

    this.categoryService.getCode(baseCode).subscribe({
      next: (code: string) => {
        this.newSku  = code;
        this.newCode = code.replace(baseCode,'');
      }
    });
  }

  onChangeSubLine2(newValue: ILine) {
    this.newSelectedSubLine2 = newValue;
    let baseCode: string = (this.newSelectedLine.code + this.newSelectedSubLine1.code.slice(-2) + this.newSelectedSubLine2.code).trim();
    this.newShortName = (this.newSelectedLine.shortname + ' ' + this.newSelectedSubLine1.shortname + ' ' + this.newSelectedSubLine2.shortname).trim();
    this.newSku = (baseCode + this.newCode).trim();

    this.categoryService.getCode(baseCode).subscribe({
      next: (code: string) => {
        this.newSku  = code;
        this.newCode = code.replace(baseCode,'');
      }
    });
  }

  cancelQuickNewItem() {
    this.newDescription = '';
    this.newPrice       = '';
    this.newStock       = '1';
  }

  addQuickNewItem() {

    let price = Number(Number(this.newPrice).toFixed(2));

    let newItem: INewItem = {
      id:             0,
      code:           this.newCode,
      shortname:      '',
      description:    this.newDescription,
      sku:            this.newSku,
      image_url:      'assets\\images\\products\\default.png',
      line:           this.newSelectedLine.id,
      subline1:       this.newSelectedSubLine1.id,
      subline2:       this.newSelectedSubLine2.id,
      price:          price,
      public:         price,
      technician:     price,
      wholesale:      price,
      distributor:    price,
      branch:         price
    }

    this.itemService.create(newItem).subscribe({
      next: (item: INewItem) => {

        let inventory: IInventory = {
          product:        item.id,
          branch:         this.currentDrawer.branch,
          stock:          Number(Number(this.newStock).toFixed(0)),
        };
        this.itemService.createInventory(inventory).subscribe({
          next: (data1: IInventory) => {

            this.notifyService.showSuccess('Producto creado con éxito.', 'Producto');
            setTimeout(() => {
              this.itemService.getAll().subscribe((data: IItem[])=>{
                this.dataBinding = data;
              });
            }, 100);
          },
          error: (error) => {
            this.notifyService.showError(error, 'Error al crear nuevo inventario');
          }
        });
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al crear nuevo elemento');
      }
    });

  }

  selectItemDiscount(item: IItem) {
    let currentPrice = this.getPrice(item) + item.disc_total;
    this.dataModalItem = item;

    this.discString1 = currentPrice.toFixed(2);
    this.discString2 = String(item.price * 1.16 * 1.10);
    this.discString3 = currentPrice.toFixed(2);

    this.discGlobalDisc = 0;
  }

  OnChangeRadioDiscount(e: any) {
    this.discPerceDisable  = true;
    this.discAmountDisable = true;
    this.discDisableApply  = true;

    switch(e.target.id) {
      case 'disPercent':
        this.discPerceDisable   = false;
        this.OnModalChangeDiscountPercent('0');
        break;
      case 'disQuantity':
        this.discAmountDisable  = false;
        this.OnModalChangeDiscountAmount('0');
        break;
    }
  }

  OnModalChangeDiscountPercent(value: string) {
    let currentPrice = this.getPrice(this.dataModalItem) + this.dataModalItem.disc_total;
    let percent      = Number(this.discPerceSelected);
    let minPrice     = this.dataModalItem.price * 1.16 * 1.10;
    
    this.dataModalItem.disc_minimum = minPrice;
    
    if(percent > 100) {
      percent = 100;
      this.discPerceSelected = '100';
    }
    let amount       = percent * currentPrice / 100;
    percent = (100 - percent) / 100;

    this.discString3 = (percent * currentPrice).toFixed(2);

    if( this.discPerceSelected != '' ) {
      this.discDisableApply = minPrice > Number(this.discString3);
      this.discGlobalDisc = amount;
      this.dataModalItem.disc_percent = Number(this.discPerceSelected);
      this.dataModalItem.disc_amount  = 0;
    }
  }

  OnModalChangeDiscountAmount(value: string) {
    let amount        = Number(this.discAmoutSelected);
    let currentPrice  = this.getPrice(this.dataModalItem) + this.dataModalItem.disc_total;
    let minPrice      = this.dataModalItem.price * 1.16 * 1.10;
    this.discString3  = (currentPrice - amount).toFixed(2);

    this.dataModalItem.disc_minimum = minPrice;
    
    if( this.discAmoutSelected != '' ) {
      this.discDisableApply = minPrice > Number(this.discString3);
      this.discGlobalDisc = Number(amount.toFixed(2));
      this.dataModalItem.disc_percent = 0;
      this.dataModalItem.disc_amount  = amount;
    }
  }

  OnModalCancelDiscount() {
    this.discPerceSelected = '';
    this.discAmoutSelected = '';
  }

  OnModalApplyDiscount() {
    this.discPerceSelected = '';
    this.discAmoutSelected = '';
    this.dataModalItem.disc_total = this.discGlobalDisc;

    this.calculateTotal();
  }

}
