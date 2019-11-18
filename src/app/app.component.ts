import { Component, OnInit } from '@angular/core';
import { faBars, faDragon, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from './services/login.service';
import { RequestApiService } from './services/request-api.service';
import { User } from './interfaces/user';
import { Router } from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Dragons App';

  public user: User = {
    id: 0,
    name: '',
    last_name: '',
    photo_url: '',
    email: ''
  };

  public faBars = faBars;
  public faDragon = faDragon;
  public faSignOutAlt = faSignOutAlt;

  public mobileScreen = $(window).width() < 768;
  public sidebarCollapsed = false;

  constructor(
    public loginService: LoginService,
    public reqService: RequestApiService,
    public router: Router
  ) { }

  ngOnInit() {
    // Verifica se o usuário está logado
    if (this.loginService.userVerify()) {
      this.user = this.loginService.userVerify();
    } else {
      this.router.navigate(['login']);
    }

    // Emite os dados do novo usuário logado
    this.loginService.getUser().subscribe(data => {
      this.user = data;
    });

    // Verifica se a tela é mobile
    if (this.mobileScreen) {
      this.sidebarCollapsed = true;
    }

    // Fecha a sidebar sempre que a rota for alterada no mobile
    this.router.events.subscribe(ev => {
      if (this.mobileScreen) {
        this.sidebarCollapsed = true;
      }
    });
  }

  logout() {
    if (this.loginService.userVerify()) {
      this.loginService.logout();
      this.router.navigate(['login']);
    }
  }

  sidebarCollapse() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
