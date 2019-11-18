import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public token = 'desafio_sicredi';
  public user: User = {
    id: 0,
    name: '',
    last_name: '',
    photo_url: '',
    email: ''
  };

  constructor() { }

  @Output() fireIsLoggedIn: EventEmitter<User> = new EventEmitter<User>();

  setUser(data) {
    localStorage.setItem(this.token, JSON.stringify(data));
    this.fireIsLoggedIn.emit(data);
  }

  getUser = () => this.fireIsLoggedIn;

  userVerify = () => JSON.parse(localStorage.getItem(this.token));

  logout() {
    localStorage.removeItem(this.token);
    this.fireIsLoggedIn.emit({
      id: 0,
      name: '',
      last_name: '',
      photo_url: '',
      email: ''
    });
  }
}
