import { Component, OnInit } from '@angular/core';
import { RequestApiService } from '../services/request-api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    public reqService: RequestApiService,
    public loginService: LoginService,
    public router: Router,
    public util: UtilsService
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    if (this.loginService.userVerify()) {
      this.router.navigate(['']);
    }

    this.util.defineTitle('Login');
  }

  login() {
    this.reqService.getJson('user.json').subscribe((data: any) => {
      if (this.formLogin.value.email === data.email && this.formLogin.value.password === data.password) {
        this.loginService.setUser(data);
        this.router.navigate(['']);
      } else {
        this.util.toaster(ToastComponent, 4000, {message: 'Email/Senha inválidos'});
      }
    }, (error: any) => {
      this.util.toaster(ToastComponent, 4000, {message: 'Email/Senha inválidos'});
    });
  }

}
