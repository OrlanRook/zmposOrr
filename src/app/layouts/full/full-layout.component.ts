import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarService } from '../../shared/sidebar/sidebar.service'
import { TokenStorageService } from 'src/app/tokens/token-storage.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit {

  constructor(public sidebarservice: SidebarService,
              private token: TokenStorageService,
              private router: Router) { }

  showSideBar: boolean = true;

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
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    if( this.token.checkAdminAccess() ) {

      this.showSideBar = false;
      this.hideSidebar();

      $(".topbar").get(0)?.style.setProperty('left','0px');
      $(".page-wrapper").get(0)?.style.setProperty('margin-left','0px');

    }
  }

}
