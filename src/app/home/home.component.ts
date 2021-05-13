import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public checkClickOpenMenu: boolean = false;
  public idMove;

  constructor() { }

  ngOnInit(): void {
  }

  moveMenu() {
    var idMove = 'menu_main';
    var check_mess = $("#mess_main").hasClass("open");
    if (check_mess == true) {
      var idClose = 'mess_main';
      this.closeMenu(idClose);
      this.openMenu(idMove);
    } else {
      if (this.checkClickOpenMenu == false) {
        this.openMenu(idMove);
      }
      if (this.checkClickOpenMenu == true) {
        this.closeMenu(idMove);
      }
    }

  }

  moveMess() {
    var idMove = 'mess_main';
    var check_mess = $("#menu_main").hasClass("open");
    if (check_mess == true) {
      var idClose = 'menu_main';
      this.closeMenu(idClose);
      this.openMenu(idMove);
    } else {
      if (this.checkClickOpenMenu == false) {
        this.openMenu(idMove);
      }
      if (this.checkClickOpenMenu == true) {
        this.closeMenu(idMove);
      }
    }
  }

  openMenu(idMove) {
    $("#main_left").css("width", "30%");
    $("#mid_main").css("width", "70%");
    $("#" + idMove).removeClass("close_l");
    $("#" + idMove).addClass("open");
    $("#" + idMove).fadeIn(800, function () {
      $("#" + idMove).css({
        width: "79%",
        height: "398px",
      });
    });
    this.resetCheckOpen(true);

  }

  closeMenu(idMove) {
    $("#main_left").css("width", "5%");
    $("#mid_main").css("width", "95%");
    $("#" + idMove).removeClass("open");
    $("#" + idMove).addClass("close_l");
    $("#" + idMove).fadeOut(800, function () {
      $("#" + idMove).css({
        width: "0%",
        height: "0px",
      });
    });
    this.resetCheckOpen(false);
  }

  resetCheckOpen(bolen) {
    setTimeout(() => {
      this.checkClickOpenMenu = bolen;
    }, 850);
  }

  dropdown(iddrop) {
    $('#' + iddrop).slideToggle(460);
  }
}
