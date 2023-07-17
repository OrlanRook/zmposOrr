import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }
  
  showSuccess(message: string, title: string){
      this.toastr.success(message, title, { enableHtml: true });
  }
  
  showError(message: string, title: string){
      this.toastr.error(message, title, { enableHtml: true, timeOut:15000 });
  }
  
  showInfo(message: string, title: string){
      this.toastr.info(message, title, { enableHtml: true });
  }
  
  showWarning(message: string, title: string){
      this.toastr.warning(message, title, { enableHtml: true });
  }
}
