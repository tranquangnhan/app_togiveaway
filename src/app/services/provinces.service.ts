import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvincesService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost/app_togiveaway/api/?act=';

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  getAllProvinces() {
    return this.http.get(this.apiUrl+'getAllProvince', this.httpOptions)
  }

}
