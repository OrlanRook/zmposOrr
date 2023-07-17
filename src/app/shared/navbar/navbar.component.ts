import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';
import { IProfile } from 'src/app/site/profile/profile.interface';
import { TokenStorageService } from 'src/app/tokens/token-storage.service';
import { CartService } from 'src/app/site/cart/cart.service';
import { BranchVoid, IBranch } from 'src/app/admin/records/branches/branches.interface';
import { DrawerVoid, IDrawer } from 'src/app/admin/drawers/drawers.interface';
import { NavNotificationService } from './navbar.service';
import { INavNotification, IPrinterCalc } from './navbar.interface';

import * as $ from 'jquery';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  dataBinding: IProfile = this.token.getUser();
  currentBranch: IBranch = BranchVoid;
  currentDrawer: IDrawer = DrawerVoid;
  navNotifications: INavNotification[] = []

  bills: any[][] = [[1000,'',0],[500,'',0],[200,'',0],[100,'',0],[50,'',0],[20,'',0]];
  coins: any[][] = [[50,'',0],[20,'',0],[10,'',0],[5,'',0],[2,'',0],[1,'',0]];

  total: number = 0;

  countNotification: number = 0;
  showNotification: boolean = false;

  showBoardButton: boolean = false;

  constructor(public sidebarservice: SidebarService, 
              private token: TokenStorageService,
              private cartService: CartService,
              private navNotificationService: NavNotificationService,
              private notifyService: NotificationService) {
  }

  getNotifications() {
    this.navNotificationService.getNotification(this.dataBinding.id).subscribe((data: INavNotification[]) => {
      this.navNotifications = data;
      if( data.length > 0) {
        this.countNotification = 0;
        data.forEach(element => {
          if( element.status == 'A' )
            this.countNotification++;
          else if( element.status == 'D' )
            element.type = 'bg-light-secondary text-secondary';
        });

        if( this.countNotification > 0)
          this.showNotification = true;
      }
    });
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }

  ngOnInit() {

    this.cartService.currentBranch$
      .subscribe(branch => { if(branch) this.currentBranch = branch });
    this.cartService.currentDrawer$
      .subscribe(drawer => { if(drawer) this.currentDrawer = drawer });
    
    this.getNotifications();

    $.getScript('./assets/js/drawer.js');

    
    this.showBoardButton = !this.token.checkAdminAccess();  

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

  clearTotal() {
    this.total = 0.0;

    this.bills.forEach(element => {
      element[1] = '';
    });

    this.coins.forEach(element => {
      element[1] = '';
    });
  }

  deactivateNotification(notify: INavNotification){
    if( notify.status == 'A') {
      notify.type = 'bg-light-secondary text-secondary';

      let n = {'status':'D'};

      this.navNotificationService.updateNotification(this.dataBinding.id, notify.id ,n).subscribe((data: INavNotification) => {
        if( this.countNotification > 0) {
          this.countNotification--;
        }
        if( this.countNotification == 0) {
          this.showNotification = false;
        }
        
      });
    }
  }

  printCalc() {
    let data: IPrinterCalc = {
      type:           'calc',
      b1000:          Number(this.bills[0][1]),
      b500:           Number(this.bills[1][1]),
      b200:           Number(this.bills[2][1]),
      b100:           Number(this.bills[3][1]),
      b50:            Number(this.bills[4][1]),
      b20:            Number(this.bills[5][1]),
      c50:            Number(this.coins[0][1]),
      c20:            Number(this.coins[1][1]),
      c10:            Number(this.coins[2][1]),
      c5:             Number(this.coins[3][1]),
      c2:             Number(this.coins[4][1]),
      c1:             Number(this.coins[5][1]),
      total:          this.total,
      drawer:         this.currentDrawer.name
    };

    this.navNotificationService.localPrint(data).subscribe({
      next: (data: any) => {
        this.bills.forEach(element => {
          element[1] = '';
          element[2] = 0;
        });
    
        this.coins.forEach(element => {
          element[1] = '';
          element[2] = 0;
        });
        this.total = 0;
      },
      error: (error) => {
        let arr = error.split('&nbsp;');
        let code = Number(arr[0]);

        if( code == 0)
          this.notifyService.showError("Servidor de impresión no disponible (printerPOS).", 'Impresora');
        else
          this.notifyService.showError(error, 'Impresora');
      }
    });
  }

}
