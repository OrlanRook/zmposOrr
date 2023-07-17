import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { BranchVoid, IBranch } from '../../records/branches/branches.interface';
import { BranchesService } from '../../records/branches/branches.service';
import { IDrawer, IDrawerAssign } from '../drawers.interface';
import { DrawerService } from '../drawers.service';

import { EmployeeService } from '../../records/employee/employee.service';
import { IProfile } from 'src/app/site/profile/profile.interface';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  employees: IProfile[] = [];
  currentEmployee!: IProfile;
  deleteEmployee?: IProfile;

  branches:    IBranch[] = [];
  currentBranch: IBranch = BranchVoid;

  drawersMaster: IDrawer[] = [];
  drawers: IDrawer[] = [];
  currentDrawer!: IDrawer;

  drawerAssign: IDrawerAssign[] = [];
  deleteDrawerAssign!: IDrawerAssign;

  constructor(public branchService: BranchesService,
              public drawerService: DrawerService,
              public employeeService: EmployeeService,
              private notifyService: NotificationService) { }

  ngOnInit(): void {

    this.employeeService.getAll().subscribe({
      next: (data: IProfile[]) => {
        this.employees = data;
        if(data.length > 0) this.currentEmployee = data[0];
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al obtener los empleados');
      }
    });

    this.branchService.getAll().subscribe({
      next: (data: IBranch[]) => {
        this.branches = data;
        if(data.length > 0) {
          this.currentBranch = this.branches[0];

          this.drawerService.getAll().subscribe({
            next: (data: IDrawer[]) => {
              this.drawersMaster = data;
              if(data.length > 0) {

                setTimeout(() => {
                  this.onChangeBranch(this.currentBranch);
                }, 420);
              }
            },
            error: (error) => {
              this.notifyService.showError(error, 'Error al obtener las cajas');
            }
          });
        }
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al obtener las sucursales');
      }
    });
  }

  onChangeBranch(event: any) {
    this.drawers = this.drawersMaster.filter(item => item.branch == event.id);
    if( this.drawers.length > 0 )
      this.currentDrawer = this.drawers[0];
      this.onChangeDrawer(this.currentDrawer);
  }

  onChangeDrawer(event: any) {
      this.currentDrawer = event;
      this.drawerService.getDrawerWithUsers(this.currentDrawer.id).subscribe({
        next: (data: IDrawerAssign[]) => {
          this.drawerAssign = data;
        },
        error: (error) => {
          this.notifyService.showError(error, 'Error al obtener los usuarios asignados a la caja');
        }
      });
  }

  onUserAssign() {
    let data: IDrawerAssign = {
      id:         0,
      user:       this.currentEmployee,
      branch:     this.currentBranch.id,
      drawer:     this.currentDrawer
    };

    this.drawerService.setUserDrawer(this.currentEmployee.id, data).subscribe({
      next: (data: IDrawerAssign) => {
        this.notifyService.showSuccess('Usuario asignado a la caja', 'Asignación de caja');
        let user: number = Number(data.user);
        let employee = this.employees.find((obj) => { return obj.id === user; });
        if( employee ) { data.user = employee; }
        this.drawerAssign.push(data);
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al asignar caja al usuario');
      }
    });
  }

  onRowSelected(item: IDrawerAssign) {
    this.deleteEmployee = item.user;
    this.deleteDrawerAssign = item;
  }

  removeRowItem() {
    let item: IDrawerAssign = this.deleteDrawerAssign;
    this.drawerService.removeUserDrawer(item).subscribe({
      next: () => {
        const index = this.drawerAssign.findIndex(el => el.id === item.id );
        if (index > -1) {
          this.drawerAssign.splice(index, 1);
        }
      },
      error: (error) => {
        this.notifyService.showError('No se pudo eliminar al cajero', 'Caja');
      }
    });
  }

}
