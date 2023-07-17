import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { PosRoutingModule } from './site-routing.module';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { SalesComponent } from './sales/sales.component';
import { OrdersComponent } from './orders/orders.component';
import { OpendrawerComponent } from './opendrawer/opendrawer.component';
import { ClosedrawerComponent } from './closedrawer/closedrawer.component';
import { LogoutComponent } from './logout/logout.component';
import { CartPipe } from './cart/cart.pipe';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { WarehousePipe } from './warehouse/warehouse.pipe'

@NgModule({
  declarations: [
    CartComponent,
    ProfileComponent,
    SalesComponent,
    OrdersComponent,
    OpendrawerComponent,
    ClosedrawerComponent,
    LogoutComponent,
    CartPipe,
    WarehouseComponent,
    WarehousePipe
  ],
  imports: [
    FormsModule,
    CommonModule,
    PosRoutingModule,
    PerfectScrollbarModule,
    NgxSpinnerModule,
    NgbTooltipModule
  ]
})
export class SiteModule { }
