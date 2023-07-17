import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../global';
import { CartComponent } from './cart/cart.component';
import { ClosedrawerComponent } from './closedrawer/closedrawer.component';
import { LogoutComponent } from './logout/logout.component';
import { OpendrawerComponent } from './opendrawer/opendrawer.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { SalesComponent } from './sales/sales.component';
import { WarehouseComponent } from './warehouse/warehouse.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthGuard],
        data: {
          userRoles: [Roles.ADMIN, Roles.MANGER, Roles.CASHIER, Roles.TECHNICIAN]
        }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Perfil',
          userRoles: [Roles.ADMIN, Roles.MANGER, Roles.CASHIER, Roles.TECHNICIAN]
        }
      },
      {
        path: 'sales',
        component: SalesComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Ventas',
          userRoles: [Roles.ADMIN, Roles.MANGER, Roles.CASHIER, Roles.TECHNICIAN]
        }
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Ordenes',
          userRoles: [Roles.ADMIN, Roles.MANGER, Roles.CASHIER, Roles.TECHNICIAN]
        }
      },
      {
        path: 'opendrawer',
        component: OpendrawerComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Abrir caja',
          userRoles: [Roles.ADMIN, Roles.MANGER, Roles.CASHIER]
        }
      },
      {
        path: 'closedrawer',
        component: ClosedrawerComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Cerrar caja',
          userRoles: [Roles.ADMIN, Roles.MANGER, Roles.CASHIER]
        }
      },
      {
        path: 'logout',
        component: LogoutComponent,
        data: {
          title: 'Salir'
        }
      },
      {
        path: 'warehouse',
        component: WarehouseComponent,
        data: {
          title: 'Alamcen',
          userRoles: [Roles.ADMIN, Roles.MANGER, Roles.CASHIER, Roles.TECHNICIAN]
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosRoutingModule { }
