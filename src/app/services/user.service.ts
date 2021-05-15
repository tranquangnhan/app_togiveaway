import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router:Router) { }
  
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
}
