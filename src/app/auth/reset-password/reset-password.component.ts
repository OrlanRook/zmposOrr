import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormGroup, AbstractControlOptions } from '@angular/forms';
import { EmployeeService } from 'src/app/admin/records/employee/employee.service';
import { TokenStorageService } from 'src/app/tokens/token-storage.service';
import { IProfile } from 'src/app/site/profile/profile.interface';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form1 = this.fb.group(
    {
    pw1: [
      null,
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.{8,})/
        ),
        Validators.minLength(8),
      ],
    ],
    pw2: [
      null,
      [
        Validators.required
      ],
    ],
    },
    { 
      validator: this.confirmedValidator('pw1', 'pw2')
    } as AbstractControlOptions );

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private employeeService: EmployeeService,
              private tokenStorage: TokenStorageService,
              private notifyService: NotificationService) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.router.navigate(['login'], { relativeTo: this.route.parent });
  }

  onSubmit() {
    if (this.form1.valid) {
      let user = this.tokenStorage.getUser() as IProfile;

      this.employeeService.updatePassword(user, String(this.form1.controls.pw1.value)).subscribe({
        next: (data: any) => {
          this.notifyService.showSuccess("Contraseña actualiza correctamente", "Autorización");
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.notifyService.showError("Error al actualizar la contraseña", "Autorización");
        }
      });
    } else {
      this.notifyService.showWarning("Los datos introducidos con invalidos", "Autorización");
    }
  }

  confirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

}
