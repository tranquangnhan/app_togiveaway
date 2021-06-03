import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { UserService } from '../../../services/user.service';
import { HttpClient } from '@angular/common/http';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [
    './menu.component.css',
    '../../../home/home.component.css'
  ]
})
export class MenuComponent implements OnInit {
  public checkClick = true;
  public dataUsFollow;
  constructor(
    private http: HttpClient,
    private userService: UserService,

  ) {
    this.getAllUsFollowto();
   }

  ngOnInit(): void {
  }

  changeBlock(idOpen, idClose) {
    var check = $('#' + idOpen).hasClass("show");

    if (check == false) {
      if (this.checkClick === true) {
        this.checkClick = false;

        $('#' + idOpen).addClass("show");
        $('#' + idClose).addClass("hidelist");
        $('#' + idClose).css("height", "0px");

        setTimeout(() => {
          $('#' + idOpen).addClass("showlist");
          $('#' + idOpen).css("height", "1000px");
          $('#' + idClose).removeClass("show");
          $('#' + idOpen).fadeIn(100);
        }, 700);

        setTimeout(() => {
          $('#' + idOpen).removeClass("showlist");
          $('#' + idClose).removeClass("hidelist");
          this.checkClick = true;
        }, 1000);
      }
    }
  }

  dropdown(iddrop) {
    $('#' + iddrop).slideToggle(460);
  }

  getAllUsFollowto() {
    var account_id = this.getIdUs();
    this.userService.getUsFollowtoById(account_id).subscribe(
      res => {
        this.dataUsFollow = res;
      }
    )
  }

  getIdUs() {
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    var token = loggedInUser.jwt
    var jwtDecodeToken = jwt_decode(token);
    var dataUs = jwtDecodeToken['data'];
    var idUs = dataUs.id;
    return idUs;
  }
}
