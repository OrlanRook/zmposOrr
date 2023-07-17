import { Component, OnInit } from '@angular/core';
import { DrawerVoid, IDrawer, IDrawerOp } from 'src/app/admin/drawers/drawers.interface';
import { DrawerService } from 'src/app/admin/drawers/drawers.service';
import { BranchVoid, IBranch } from 'src/app/admin/records/branches/branches.interface';
import { BranchesService } from 'src/app/admin/records/branches/branches.service';
import { NotificationService } from 'src/app/notification.service';
import { TokenStorageService } from 'src/app/tokens/token-storage.service';
import { CartService } from '../cart/cart.service';
import { IProfile } from '../profile/profile.interface';
import { ProfileService } from '../profile/profile.service';

import * as $ from 'jquery';
import { ISalePayment } from '../sales/sales.interface';

@Component({
  selector: 'app-closedrawer',
  templateUrl: './closedrawer.component.html',
  styleUrls: ['./closedrawer.component.scss']
})
export class ClosedrawerComponent implements OnInit {

  user:         IProfile = this.token.getUser();
  currentBranch: IBranch = BranchVoid;
  currentDrawer: IDrawer = DrawerVoid;

  amtOpen:        number = 0;
  amtCash:        number = 0;
  amtCard:        number = 0;
  amtTransfer:    number = 0;
  amtDeviation:   number = 0;
  amtNotes:       string = '';

  currentTime: Date = new Date();

  // [0] -> value
  // [1] -> quantity
  // [2] -> calculate
  bills: any[][] = [
    [1000,'',0],
    [ 500,'',0],
    [ 200,'',0],
    [ 100,'',0],
    [  50,'',0],
    [  20,'',0]
  ];
  coins: any[][] = [
    [  50,'',0],
    [  20,'',0],
    [  10,'',0],
    [   5,'',0],
    [   2,'',0],
    [   1,'',0]
  ];

  total: number = 0;

  canClose: boolean = false;

  constructor(public branchService: BranchesService,
              public drawerService: DrawerService,
              private cartService: CartService,
              private profileService: ProfileService,
              private token: TokenStorageService,
              private notifyService: NotificationService) {

    this.cartService.currentBranch$
      .subscribe(branch => { if(branch) this.currentBranch = branch });
    this.cartService.currentDrawer$
      .subscribe(drawer => { if(drawer) this.currentDrawer = drawer });

    
    this.profileService.getProfile(this.user.id).subscribe((data:IProfile) => {
      if( data.drawer ) {
        this.canClose = true;
        this.drawerService.getDrawerStatus(data.drawer.id).subscribe({
          next: (dataOp: IDrawerOp) => {
            this.amtOpen = dataOp.total;

            this.drawerService.getDrawerTotals(data.drawer.id).subscribe({
              next: (dataPay: ISalePayment[]) => {
                dataPay.forEach(payment => {
                  if( payment.method == 'CA') {
                    this.amtCash = Number(payment.total);
                  }
                  else if( payment.method == 'CC') {
                    this.amtCard = Number(payment.total);
                  }
                  else if( payment.method == 'TR') {
                    this.amtTransfer = Number(payment.total);
                  }
                  
                });
                this.calculateDeviation();
              },
              error: (error) => {
                this.notifyService.showError(error, 'Error obtener los pagos');
              }
            });
          },
          error: (error) => {
            this.notifyService.showError(error, 'Error obtener el estado de la caja');
          }
        });
      }
      else {
        this.notifyService.showWarning("No hay alguna caja abierta para el usuario actual.","Error al cerrar caja")
      }
    });
  }

  ngOnInit(): void {
    $.getScript('./assets/js/drawer.js');
  }

  inputNumberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode >= 48 && charCode <= 57) {
      return true;
    }
    return false;
  }
  onChange(event: Event, data:any) {
    data[2] = Number(data[0]) * Number(data[1]);

    this.total = 0.0;

    this.bills.forEach(element => {
      this.total += Number(element[0]) * Number(element[1]);
    });

    this.coins.forEach(element => {
      this.total += Number(element[0]) * Number(element[1]);
    });

    this.calculateDeviation();
  }

  onCloseDrawer(){
    let op: IDrawerOp = {
      id:              0,
      drawer:          this.currentDrawer.id,
      operation:       'CL',
      deviation:       this.amtDeviation < 0.0,
      deviation_amt:   Number(this.amtDeviation.toFixed(2)),
      notes:           this.amtNotes,
      total:           this.total,
      b_1000:          this.bills[0][1] == '' ? 0 : this.bills[0][1],
      b_500:           this.bills[1][1] == '' ? 0 : this.bills[1][1],
      b_200:           this.bills[2][1] == '' ? 0 : this.bills[2][1],
      b_100:           this.bills[3][1] == '' ? 0 : this.bills[3][1],
      b_50:            this.bills[4][1] == '' ? 0 : this.bills[4][1],
      b_20:            this.bills[5][1] == '' ? 0 : this.bills[5][1],
      c_50:            this.coins[0][1] == '' ? 0 : this.coins[0][1],
      c_20:            this.coins[1][1] == '' ? 0 : this.coins[1][1],
      c_10:            this.coins[2][1] == '' ? 0 : this.coins[2][1],
      c_5:             this.coins[3][1] == '' ? 0 : this.coins[3][1],
      c_2:             this.coins[4][1] == '' ? 0 : this.coins[4][1],
      c_1:             this.coins[5][1] == '' ? 0 : this.coins[5][1],
      created_date:    ''
    }
    console.log(op);

    this.drawerService.createDrawerOperation(op).subscribe({
      next: (data: IDrawerOp) => {
        if(this.currentDrawer) {
          this.cartService.updateDrawer(DrawerVoid);
        }
        if(this.currentBranch) {
          this.cartService.updateBranch(BranchVoid);
        }
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al cerrar caja');
      }
    });
  }

  calculateDeviation()
  {
    this.amtDeviation = Number(this.total) - (Number(this.amtOpen) + Number(this.amtCash));
  }

}
