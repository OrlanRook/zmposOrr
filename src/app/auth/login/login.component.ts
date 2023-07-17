import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../../tokens/token-storage.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {
    phone: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  isPersistent = true;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private notifyService: NotificationService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { phone, password } = this.form;
    this.authService.login(phone, password).subscribe({
      next: data => {

        this.tokenStorage.saveToken(this.isPersistent, data['token']);
        this.tokenStorage.saveUser(this.isPersistent, data['user']);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        
        if( data['user']['verify_at'] ) {
          this.router.navigateByUrl(this.authService.redirectUrl);
        }
        else {
          this.router.navigateByUrl('auth/reset-password');
        }
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;

        this.notifyService.showError("Usuario y/o contraseña incorrectos", "Error de ingreso");
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  onForgotpassword() {
    this.router.navigate(['forgot-password'], { relativeTo: this.route.parent });
  }

}
