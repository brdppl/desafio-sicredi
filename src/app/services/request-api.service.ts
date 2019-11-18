import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestApiService {

  constructor(
    public http: HttpClient
  ) { }

  public urlBase = 'https://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1';

  getRequest = (endpoint) => this.http.get(`${this.urlBase}/${endpoint}`);

  postRequest = (endpoint, data) => this.http.post(`${this.urlBase}/${endpoint}`, data);

  putRequest = (endpoint, data) => this.http.put(`${this.urlBase}/${endpoint}`, data);

  delRequest = (endpoint) => this.http.delete(`${this.urlBase}/${endpoint}`);

  getJson = (endpoint) => this.http.get(`assets/data/${endpoint}`);
}
