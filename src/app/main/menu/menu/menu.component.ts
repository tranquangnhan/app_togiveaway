import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { UserService } from '../../../services/user.service';
import { HttpClient } from '@angular/common/http';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
// import { DatePipe } from '@angular/common';

import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

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
    private router: Router
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

  gotoChatRoom(idus) {
    const roomId = idus;
    // firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname).on('value', (resp: any) => {
    //   let roomuser = [];
    //   roomuser = snapshotToArray(resp);

    //   const user = roomuser.find(x => x.nickname === this.nickname);
    //   if (user !== undefined) {
    //     const userRef = firebase.database().ref('roomusers/' + user.key);
    //     userRef.update({status: 'online'});
    //   } else {
    //     const newroomuser = { roomname: '', nickname: '', status: '' };
    //     newroomuser.roomname = roomname;
    //     newroomuser.nickname = this.nickname;
    //     newroomuser.status = 'online';
    //     const newRoomUser = firebase.database().ref('roomusers/').push();
    //     newRoomUser.set(newroomuser);
    //   }
    // });
    this.router.navigate(['/chatroom', idus]);
  }
}
