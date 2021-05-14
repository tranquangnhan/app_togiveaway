import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatablogsService {

  constructor(private http: HttpClient) { }
  heroesUrl = 'http://localhost/app_togiveaway/api/?act=';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  addHero(data) {
    return this.http.post(this.heroesUrl+'addAccount',{ "data": data }, this.httpOptions)
  }

  addnewblog(data) {
    return this.http.post(this.heroesUrl+'addNewBlog',{ "data": data }, this.httpOptions)
  }
}
