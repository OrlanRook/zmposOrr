import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { EmployeeService } from 'src/app/admin/records/employee/employee.service';
import { NotificationService } from 'src/app/notification.service';
import { TokenStorageService } from 'src/app/tokens/token-storage.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  phone: string = '';

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private tokenStorage: TokenStorageService,
              private notifyService: NotificationService) { }

  ngOnInit(): void {
  }

  onSignIn() {
    this.router.navigate(['login'], { relativeTo: this.route.parent });
  }

  onSubmit() {
    this.employeeService.resetPassword(this.phone).subscribe({
      next: (data: any) => {
        this.notifyService.showSuccess("Se ha enviado el código de desbloqueo a su teléfono", "Autorización");
        this.tokenStorage.signOut();
        this.router.navigateByUrl('auth/login');
      },
      error: () => {
        this.notifyService.showError("Error intentar recuperar la contraseña", "Autorización");
      }
    });
  }

}
