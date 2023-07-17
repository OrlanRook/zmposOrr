import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPrinterDB } from '../sales/sales.interface';
import { DrawerVoid, IDrawer } from 'src/app/admin/drawers/drawers.interface';
import { BranchVoid, IBranch } from 'src/app/admin/records/branches/branches.interface';
import { errorHandler, GlobalVariable } from 'src/app/global';
import { TokenStorageService } from 'src/app/tokens/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiURL = GlobalVariable.BASE_API_URL;

  public isDrawerOpen: boolean = false;
  private currentBranch: BehaviorSubject<IBranch> = new BehaviorSubject<IBranch>(BranchVoid);
  public currentBranch$: Observable<IBranch> = this.currentBranch.asObservable();
  private currentDrawer: BehaviorSubject<IDrawer> = new BehaviorSubject<IDrawer>(DrawerVoid);
  public currentDrawer$: Observable<IDrawer> = this.currentDrawer.asObservable();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient,
              private storageService: TokenStorageService) { }

  updateBranch(branch: IBranch) {
    this.currentBranch.next(branch);
  }
  updateDrawer(drawer: IDrawer) {
    this.currentDrawer.next(drawer);
  }

  localPrint(data:IPrinterDB): Observable<any> {
    let printerServer = this.storageService.getConfig('printer');

    if( !printerServer ) {
      printerServer = 'http://localhost:7000/';
    }

    data.type = 'ticket';
    return this.httpClient.post<any>(printerServer, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(errorHandler)
      );
  }
}