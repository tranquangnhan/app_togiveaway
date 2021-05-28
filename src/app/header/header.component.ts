import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css',
    '../home/home.component.css']
})
export class HeaderComponent implements OnInit {

  public user;
  public token;
  public dataUs;
  public us;
  constructor(
    private userService: UserService,
  ) {
    this.user = JSON.parse(this.userService.getToken());
    this.token = this.user.jwt;
    this.dataUs =  jwt_decode(this.token);
    this.us = this.dataUs.data;
  }

  ngOnInit(): void {
  }

}
