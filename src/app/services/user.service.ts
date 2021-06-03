import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost/app_togiveaway/api/?act=';

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private router:Router,
    private http: HttpClient
    ) { }

  getToken(){
    return localStorage.getItem('loggedInUser');
  }

  setToken(token:string){
    localStorage.setItem('loggedInUser',token);
  }

  removeToken(){
    localStorage.removeItem('loggedInUser');
  }

  isLoggedIn():boolean{
    return this.getToken() !== null;
  }

  logout(){
    this.removeToken();
    this.router.navigate(['/']);
  }

  usNhapLanDau(data) {
    return this.http.post(this.apiUrl+'usnhapLanDau',{ "data" :data }, this.httpOptions)
  }

  getUsById(id) {
    return this.http.post(this.apiUrl + "getUsById", { id }, this.httpOptions);
  }

  getUsFollowtoById(id) {
    return this.http.post(this.apiUrl + "getUsFollowtoById", { id }, this.httpOptions);
  }

  getUsIdByIdaccount(id_account) {
    return this.http.post(this.apiUrl + "getUsIdByIdaccount", { id_account }, this.httpOptions);
  }
}
