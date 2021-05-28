import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

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

  getCommentByIdBlog(id) {
    return this.http.post(this.apiUrl + 'getAllCommentByIdBlog', { 'id': id }, this.httpOptions);
  }

  getRepCommentByIdComment(id) {
    return this.http.post(this.apiUrl + 'getRepCommentByIdComment', { 'id': id }, this.httpOptions);
  }

  updateLike(data){
    return this.http.post(this.apiUrl+'updatelike',{ 'data': data }, this.httpOptions)
  }
}
