import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BuysComponent } from './buys/buys.component';
import { SalesComponent } from './sales/sales.component';
import { RepairsComponent } from './repairs/repairs.component';
import { GeneralComponent } from './reports/general/general.component';
import { ReturnComponent } from './reports/return/return.component';
import { WarrantyComponent } from './reports/warranty/warranty.component';
import { MovementsComponent } from './drawers/movements/movements.component';
import { BoxcutComponent } from './drawers/boxcut/boxcut.component';
import { PaymentmethodComponent } from './catalogues/paymentmethod/paymentmethod.component';
import { ConditionComponent } from './catalogues/condition/condition.component';
import { RepairserviceComponent } from './catalogues/repairservice/repairservice.component';
import { TroubleComponent } from './catalogues/trouble/trouble.component';
import { BrandComponent } from './catalogues/brand/brand.component';
import { DeviceComponent } from './catalogues/device/device.component';
import { ReturntypeComponent } from './catalogues/returntype/returntype.component';
import { ProviderComponent } from './records/provider/provider.component';
import { EmployeeComponent } from './records/employee/employee.component';
import { ClientComponent } from './records/client/client.component';
import { ItemComponent } from './items/item/item.component';
import { CategoryComponent } from './items/category/category.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BranchesComponent } from './records/branches/branches.component';
import { AssignmentComponent } from './drawers/assignment/assignment.component';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from "ng-apexcharts";
import { GoalsComponent } from './system/goals/goals.component';
import { NotifyComponent } from './system/notify/notify.component';
import { ConfigComponent } from './system/config/config.component';
import { ProviderPipe } from './records/provider/provider.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClientPipe } from './records/client/client.pipe';
import { BranchPipe } from './records/branches/branches.pipe';
import { EmployeePipe } from './records/employee/employee.pipe';
import { RegisterComponent } from './inventory/register/register.component';
import { InputComponent } from './inventory/input/input.component';
import { TransferComponent } from './inventory/transfer/transfer.component';
import { ReEntryComponent } from './inventory/re-entry/re-entry.component';
import { OrdersComponent } from './inventory/orders/orders.component';
import { PayableComponent } from './finance/payable/payable.component';
import { ReceivableComponent } from './finance/receivable/receivable.component';
import { LinesComponent } from './inventory/lines/lines.component';
import { TagsComponent } from './inventory/tags/tags.component';
import { RegisterPipe } from './inventory/register/register.pipe';
import { InputPipe } from './inventory/input/input.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    BuysComponent,
    SalesComponent,
    RepairsComponent,
    GeneralComponent,
    ReturnComponent,
    WarrantyComponent,
    MovementsComponent,
    BoxcutComponent,
    PaymentmethodComponent,
    ConditionComponent,
    RepairserviceComponent,
    TroubleComponent,
    BrandComponent,
    DeviceComponent,
    ReturntypeComponent,
    ProviderComponent,
    EmployeeComponent,
    ClientComponent,
    BranchesComponent,
    ItemComponent,
    CategoryComponent,
    BranchesComponent,
    AssignmentComponent,
    GoalsComponent,
    NotifyComponent,
    ConfigComponent,
    ProviderPipe,
    ClientPipe,
    BranchPipe,
    EmployeePipe,
    RegisterPipe,
    InputPipe,
    RegisterComponent,
    InputComponent,
    TransferComponent,
    ReEntryComponent,
    OrdersComponent,
    LinesComponent,
    TagsComponent,
    PayableComponent,
    ReceivableComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    PerfectScrollbarModule,
    NgApexchartsModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
