import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FormsModule } from '@angular/forms';
import { ColorSwitcherComponent } from './color-switcher/color-switcher.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    ColorSwitcherComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    NgbModule,
    PerfectScrollbarModule
  ],
  exports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    ColorSwitcherComponent,
    NgbModule
  ]
})
export class SharedModule { }
