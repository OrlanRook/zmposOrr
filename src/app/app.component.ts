import { Component } from '@angular/core';
import { TokenStorageService } from './tokens/token-storage.service';
import { AuthService } from './auth/auth.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from './site/profile/profile.service';
import { CartService } from './site/cart/cart.service';
import { BranchesService } from './admin/records/branches/branches.service';
import { IProfile } from './site/profile/profile.interface';
import { IBranch } from './admin/records/branches/branches.interface';
import { ConfigService } from './config.service';
import { IConfig } from './config.interface';
import { config } from 'rxjs';
import { UserNotifyService } from './admin/system/notify/notify.service';
import { NotificationService } from './notification.service';

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NgbTooltipConfig]
})

export class AppComponent {
  title="pos";

  constructor(private storageService: TokenStorageService,
              private authService: AuthService,
              config: NgbTooltipConfig,
              private profileService: ProfileService,
              private cartService: CartService,
              private branchService: BranchesService,
              private configService: ConfigService,
              private notifyService: NotificationService) { 
    config.openDelay = 1200;
    config.placement = "bottom";
    config.tooltipClass = "customTooltip"

  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      const user = this.storageService.getUser();

      this.profileService.getProfile(user.id).subscribe((data:IProfile) => {

        this.storageService.saveUser(this.storageService.isPersistent(), data);

        if( data.drawer ) {
          this.cartService.updateDrawer(data.drawer);
          this.branchService.getBranch(data.drawer.branch).subscribe((data: IBranch) => {
            this.cartService.updateBranch(data);
          });
        }
      });

      this.configService.getAll().subscribe({
        next: (data: IConfig[]) => {
          data.forEach(config => {
            this.storageService.setConfig(config.attribute, config.value);
          });
        },
        error: (error) => {
          this.notifyService.showError('No se pudo obtner la configuración del sistema','Configuración');
        }
      });
    }
  }
}
