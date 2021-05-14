import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DatablogsService {


  heroesUrl = 'http://localhost/app_togiveaway/api/?act=';
  public currentUserValue;
    
  constructor(private http: HttpClient) { 
    this.currentUserValue = JSON.parse(localStorage.getItem('loggedInUser'));
  }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  addHero(data) {
    return this.http.post(this.heroesUrl+'addAccount',{ "data": data }, this.httpOptions) 
  } 




}
