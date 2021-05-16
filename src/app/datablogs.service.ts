import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DatablogsService {


  apiUrl = 'http://localhost/app_togiveaway/api/?act=';
  public currentUserValue;

  constructor(private http: HttpClient) {
    this.currentUserValue = JSON.parse(localStorage.getItem('loggedInUser'));
  }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  loginUser(data) {
    return this.http.post(this.apiUrl+'loginUser',{ "data": data }, this.httpOptions)
  }

  addnewblog(data) {
    return this.http.post(this.apiUrl+'addNewBlog',{ "data": data }, this.httpOptions)
  }
  //   return this.http.post(this.heroesUrl+'addAccount',{ "data": data }, this.httpOptions)
  // }




}
