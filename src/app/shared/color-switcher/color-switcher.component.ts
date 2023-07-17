import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/tokens/token-storage.service';
import { IProfile, ISettings } from 'src/app/site/profile/profile.interface'
import { ProfileService } from 'src/app/site/profile/profile.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-color-switcher',
  templateUrl: './color-switcher.component.html',
  styleUrls: ['./color-switcher.component.scss']
})
export class ColorSwitcherComponent implements OnInit {

  constructor(private tokenService: TokenStorageService,
              private profileService: ProfileService,
              private notifyService: NotificationService) { }

  user: IProfile = this.tokenService.getUser();
  Theme:   string[] = ['','',''];
  
  ngOnInit() {
    $(".switcher-btn").on("click", function() {
      $(".switcher-wrapper").toggleClass("switcher-toggled")
    }), $(".close-switcher").on("click", function() {
      $(".switcher-wrapper").removeClass("switcher-toggled")
    })

    if( this.user.settings ) {
      this.Theme[0] = this.user.settings.theme;
      this.Theme[1] = this.user.settings.theme_header;
      this.Theme[2] = this.user.settings.theme_sidebar;
    }

    $("html").attr('class', this.Theme.join(' ').trim());

    if(this.Theme[0] == 'light-theme')   $('#lightmode').attr('checked', 'checked');
    if(this.Theme[0] == 'dark-theme')    $('#darkmode').attr('checked', 'checked');
    if(this.Theme[0] == 'semi-dark')     $('#semidark').attr('checked', 'checked');
    if(this.Theme[0] == 'minimal-theme') $('#minimaltheme').attr('checked', 'checked');
  }
  
  theme (data: any) {
    this.Theme[0] = data;
    $("html").attr('class', this.Theme.join(' ').trim());
    this.profileService.updateSettings(this.user.id, this.user.settings.id, {'theme': data}).subscribe({
      next: (data: ISettings) => {
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al guardar configuraciones');
      }
    });
  }

  header(data: any) {
    let color = 'color-header headercolor' + data;
    if( data == 6) color = '';
    this.Theme[1] = color;
    $("html").attr('class', this.Theme.join(' ').trim());
    this.profileService.updateSettings(this.user.id, this.user.settings.id, {'theme_header': color}).subscribe({
      next: (data: ISettings) => {
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al guardar configuraciones');
      }
    });
  }

  sidebar(data: any) {
    let sb = 'color-sidebar sidebarcolor' + data;
    if( data == 1) sb = '';
    this.Theme[2] = sb;
    $("html").attr('class', this.Theme.join(' ').trim());
    this.profileService.updateSettings(this.user.id, this.user.settings.id, {'theme_sidebar': sb}).subscribe({
      next: (data: ISettings) => {
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al guardar configuraciones');
      }
    });
  }

}
