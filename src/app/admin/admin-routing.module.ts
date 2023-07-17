import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../global';
import { BuysComponent } from './buys/buys.component';
import { BrandComponent } from './catalogues/brand/brand.component';
import { ConditionComponent } from './catalogues/condition/condition.component';
import { DeviceComponent } from './catalogues/device/device.component';
import { PaymentmethodComponent } from './catalogues/paymentmethod/paymentmethod.component';
import { RepairserviceComponent } from './catalogues/repairservice/repairservice.component';
import { ReturntypeComponent } from './catalogues/returntype/returntype.component';
import { TroubleComponent } from './catalogues/trouble/trouble.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignmentComponent } from './drawers/assignment/assignment.component';
import { BoxcutComponent } from './drawers/boxcut/boxcut.component';
import { MovementsComponent } from './drawers/movements/movements.component';
import { CategoryComponent } from './items/category/category.component';
import { ItemComponent } from './items/item/item.component';
import { BranchesComponent } from './records/branches/branches.component';
import { ClientComponent } from './records/client/client.component';
import { EmployeeComponent } from './records/employee/employee.component';
import { ProviderComponent } from './records/provider/provider.component';
import { RepairsComponent } from './repairs/repairs.component';
import { GeneralComponent } from './reports/general/general.component';
import { ReturnComponent } from './reports/return/return.component';
import { WarrantyComponent } from './reports/warranty/warranty.component';
import { SalesComponent } from './sales/sales.component';
import { ConfigComponent } from './system/config/config.component';
import { GoalsComponent } from './system/goals/goals.component';
import { NotifyComponent } from './system/notify/notify.component';
import { RegisterComponent } from './inventory/register/register.component';
import { InputComponent } from './inventory/input/input.component';
import { TransferComponent } from './inventory/transfer/transfer.component';
import { ReEntryComponent } from './inventory/re-entry/re-entry.component';
import { OrdersComponent } from './inventory/orders/orders.component';
import { PayableComponent } from './finance/payable/payable.component';
import { ReceivableComponent } from './finance/receivable/receivable.component';
import { LinesComponent } from './inventory/lines/lines.component';
import { TagsComponent } from './inventory/tags/tags.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Dashboard',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'reports/general',
        component: GeneralComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Reportes',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'reports/return',
        component: ReturnComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Devoluciones',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'reports/warranty',
        component: WarrantyComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Garantías',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'drawers/assignment',
        component: AssignmentComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Asignar Cajero',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'drawers/movements',
        component: MovementsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Movimientos de caja',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'drawers/boxcut',
        component: BoxcutComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Cortes de caja',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'buys',
        component: BuysComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Compras',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'sales',
        component: SalesComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Ventas',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'repairs',
        component: RepairsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Taller de celulares',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'items/item',
        component: ItemComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Productos',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'items/category',
        component: CategoryComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Líneas',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'records/provider',
        component: ProviderComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Proveedores',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'records/employee',
        component: EmployeeComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Empleados',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'records/client',
        component: ClientComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Clientes',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'records/branchoffice',
        component: BranchesComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Sucursales',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'catalogues/paymentmethod',
        component: PaymentmethodComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Métodos de pago',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'catalogues/condition',
        component: ConditionComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Condiciones',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'catalogues/repairservice',
        component: RepairserviceComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Servicos de taller',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'catalogues/trouble',
        component: TroubleComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Problemas',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'catalogues/brand',
        component: BrandComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Marcas',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'catalogues/device',
        component: DeviceComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Dispositivos',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'catalogues/returntype',
        component: ReturntypeComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Tipo de devolución',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'inventory/register',
        component: RegisterComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Registro',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'inventory/input',
        component: InputComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Entrada',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'inventory/transfer',
        component: TransferComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Traspaso',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'inventory/re-entry',
        component: ReEntryComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Reingreso',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'inventory/orders',
        component: OrdersComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Pedidos',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'inventory/lines',
        component: LinesComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Inv x Linea',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'inventory/tags',
        component: TagsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Etiquetas',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'finance/payable',
        component: PayableComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Cuenta x Pagar',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'finance/receivable',
        component: ReceivableComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Cuentas x Cobrar',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'system/goals',
        component: GoalsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Objectivos Financieros',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'system/notify',
        component: NotifyComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Notificaciones',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      },
      {
        path: 'system/config',
        component: ConfigComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Configuración',
          userRoles: [Roles.ADMIN, Roles.MANGER]
        }
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
