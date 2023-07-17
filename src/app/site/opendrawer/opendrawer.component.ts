import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IDrawerAssign, IDrawerOp } from 'src/app/admin/drawers/drawers.interface';
import { DrawerService } from 'src/app/admin/drawers/drawers.service';
import { BranchVoid, IBranch } from 'src/app/admin/records/branches/branches.interface';
import { BranchesService } from 'src/app/admin/records/branches/branches.service';
import { NotificationService } from 'src/app/notification.service';
import { TokenStorageService } from 'src/app/tokens/token-storage.service';
import { CartService } from '../cart/cart.service';
import { IProfile } from '../profile/profile.interface';
import { ProfileService } from '../profile/profile.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-opendrawer',
  templateUrl: './opendrawer.component.html',
  styleUrls: ['./opendrawer.component.scss']
})
export class OpendrawerComponent implements OnInit {

  user:         IProfile = this.token.getUser();
  branches:    IBranch[] = [];
  currentBranch: IBranch = BranchVoid;

  drawers: IDrawerAssign[] = [];
  currentDrawer!: IDrawerAssign;

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

  canOpen: boolean = false;

  constructor(public branchService: BranchesService,
              public drawerService: DrawerService,
              private token: TokenStorageService,
              private cartService: CartService,
              private profileService: ProfileService,
              private notifyService: NotificationService) {

    this.profileService.getProfile(this.user.id).subscribe((data:IProfile) => {
      if( !data.drawer ) {
        this.canOpen = true;
      }
      else {
        this.notifyService.showWarning("Existe una caja abierta para el usuario actual.","Error al abrir caja")
      }
    });
  }

  ngOnInit(): void {
    this.branchService.getUserBranch(this.token.getUser().id).subscribe((branches: IBranch[])=>{
      this.branches       = branches;
      this.currentBranch  = this.branches[0];
      if( this.currentBranch ) {
        this.drawers        = this.currentBranch.drawer_assign;
        this.currentDrawer  = this.drawers[0]
      }
      else {
        this.notifyService.showWarning("El ususario actual no tiene alguna caja asignada.","Asignación de caja")
        this.canOpen = false;
      }
    });

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
  }

  onChangeBranch(event: Event) {
    this.drawers = this.currentBranch!.drawer_assign;
    this.currentDrawer = this.drawers[0];
  }

  onOpenDrawer(){
    let op: IDrawerOp = {
      id:              0,
      drawer:          this.currentDrawer.drawer.id,
      operation:       'OP',
      deviation:       false,
      deviation_amt:   0.0,
      notes:           '',
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

    this.drawerService.createDrawerOperation(op).subscribe((data: IDrawerOp) => {

      if(this.currentDrawer) {
        this.cartService.updateDrawer(this.currentDrawer.drawer);
      }
      if(this.currentBranch) {
        this.cartService.updateBranch(this.currentBranch);
      }

    });
  }

}
