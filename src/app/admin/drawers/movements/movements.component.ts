import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { BranchVoid, IBranch } from '../../records/branches/branches.interface';
import { BranchesService } from '../../records/branches/branches.service';
import { IDrawer, IDrawerOp } from '../drawers.interface';
import { DrawerService } from '../drawers.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {

  branches:    IBranch[] = [];
  currentBranch: IBranch = BranchVoid;

  drawersMaster: IDrawer[] = [];
  drawers: IDrawer[] = [];
  currentDrawer!: IDrawer;

  dateMonth: string = '';
  drawerOps: IDrawerOp[] = [];

  constructor(public branchService: BranchesService,
              public drawerService: DrawerService,
              private notifyService: NotificationService) { }

  ngOnInit(): void {

    let now = new Date();
    this.dateMonth = String(now.getFullYear()) + '-' + String(now.getMonth()+1).padStart(2, '0');

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

  getMoves() {
    this.drawerService.getDrawerMoves(this.currentDrawer.id, this.dateMonth).subscribe({
        next: (data: IDrawerOp[]) => {
          this.drawerOps = data;
        },
        error: (error) => {
          this.notifyService.showError(error, 'Error en caja');
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
    this.getMoves();
  }

  OnChangeDate(event: any) {
    this.getMoves();
  }

}
