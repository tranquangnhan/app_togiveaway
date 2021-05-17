import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [
    './header.component.css',
    '../home/home.component.css']
})
export class HeaderComponent implements OnInit {
  public user;
  constructor(
    private userService: UserService,
  ) {
    this.user = JSON.parse(this.userService.getToken());

  }

  ngOnInit(): void {
  }

}
