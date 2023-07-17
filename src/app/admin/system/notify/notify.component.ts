import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { UserNotifyService } from './notify.service';
import { INotification } from './notify.interface';
import { EmployeeService } from '../../records/employee/employee.service';
import { IProfile } from 'src/app/site/profile/profile.interface';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {

  now = new Date();

  notifications: INotification[] = [];
  employees:          IProfile[] = [];

  checkAllEmployee:      boolean = true;

  newDate:                string = this.formatDate(new Date(this.now.getTime() + (1000 * 60 * 60 * 24)));
  newHeader:              string = '';
  newBody:                string = '';
  newType:                string = 'bg-light-success text-success';
  newIcon:                string = 'bx bx-cart-alt';

  constructor(private userNotifyService: UserNotifyService,
              private notifyService: NotificationService,
              private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.userNotifyService.getNotification().subscribe({
      next: (data:INotification[]) => {
        this.notifications = data;
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error');
      }
    });
    this.employeeService.getAll().subscribe({
      next: (data: IProfile[]) => {
        this.employees = data;
        this.employees.forEach(employee => {
          employee.checked = true;
        });
      },
      error: (error) => {
        this.notifyService.showError('No se pudo obtener la lista de empleados', 'Empleados');
      }
    });

    $.getScript('./assets/plugins/select2/select2.min.js');
    $.getScript('./assets/js/custom-select2.js');
  }

  addNotification() {
    if( this.newHeader == ''){
      this.notifyService.showError('El título no puede estar vacio', 'Título');
      return;
    }
    if( this.newBody == ''){
      this.notifyService.showError('El mensaje no puede estar vacio', 'Mensaje');
      return;
    }

    let newNotifications: INotification[] = [];
    this.employees.forEach(employee => {
      if( employee.checked ) {
        let noti: INotification = {
          id:             0,
          header:         this.newHeader,
          body:           this.newBody,
          expire:         this.newDate,
          status:         'A',
          user:           employee,
          class_image:    this.newIcon,
          created_date:   this.now,
          type:           this.newType,
          timediff:       '',
          color:          ''
        };
        newNotifications.push(noti);
      }
    });

    if( newNotifications.length > 0) {
      this.userNotifyService.createNotification(newNotifications).subscribe({
        next: (data:INotification[]) => {
          this.notifyService.showSuccess('Notificación creada correctamente', 'Notificación');
          data.forEach(element => {
            let user: number = Number(element.user);
            let employee = this.employees.find((obj) => {
              return obj.id === user;
            });
            if( employee ) {
              element.user = employee;
            }
            this.notifications.unshift(element);
          });
        },
        error: (error) => {
          this.notifyService.showError(error, 'Error');
        }
      });
    }
    else {
      this.notifyService.showInfo("Ningún empleado fue selecionado", "Notificación");
    }

  }

  formatDate(date: Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  onCheck(value: any) {
    this.checkAllEmployee = value;
    this.employees.forEach(element => {
      element.checked = this.checkAllEmployee;
    });
  }

  checkExpire(item: INotification) {
    return this.now < new Date(item.expire);
  }

  removeNotification(item: INotification) {
    this.userNotifyService.deleteNotification(item).subscribe({
      next: () => {
        const index = this.notifications.findIndex(el => el.id === item.id );
        if (index > -1) {
          this.notifications.splice(index, 1);
        }
      },
      error: (error) => {
        this.notifyService.showError('No se pudo eliminar la notificación', 'Notificaciones');
      }
    });
  }

}
