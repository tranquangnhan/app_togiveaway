import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

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
  constructor() { }

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

}
