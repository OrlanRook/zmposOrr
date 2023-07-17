import { Component, OnInit } from '@angular/core';
import { IConfig } from 'src/app/config.interface';
import { ConfigService } from 'src/app/config.service';
import { NotificationService } from 'src/app/notification.service';
import { TokenStorageService } from 'src/app/tokens/token-storage.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  configs: IConfig[] = [];
  selectedConfig?: IConfig;
  newValue: string = '';


  constructor(private notifyService: NotificationService,
              private configService: ConfigService,
              private storageService: TokenStorageService) { }

  ngOnInit(): void {
    this.configService.getAll().subscribe({
      next: (data:IConfig[]) => {
        this.configs = data;
      },
      error: (error) => {
        this.notifyService.showError('No se  ha podido obtener las configuraciones del sistema', 'Configuración');
      }
    });
  }

  onUpdate(data: IConfig) {
    this.selectedConfig = data;
  }

  updateConfigs() {
    if( this.selectedConfig ) {
      this.selectedConfig.value = this.newValue;

      this.configService.updateConfig(this.selectedConfig).subscribe({
        next: (data:IConfig) => {
          this.storageService.setConfig(data.attribute, data.value);
          this.notifyService.showSuccess('Configuración del sistema actualizada', 'Configuración');
        },
        error: (error) => {
          this.notifyService.showError('No se  ha podido obtener las configuraciones del sistema', 'Configuración');
        }
      });
    }
  }

}
