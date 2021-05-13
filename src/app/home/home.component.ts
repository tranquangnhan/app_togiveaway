import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

// import { DataHomeService } from '../data-home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public checkClick = true;
  public checkclick_ = true;
  // private DataHomeService: DataHomeService
  constructor() { }

  ngOnInit(): void {
    // this.showDataHome();
  }

  dropdown(iddrop) {
    $('#' + iddrop).slideToggle(460);
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
        }, 1050);

        setTimeout(() => {
          $('#' + idOpen).removeClass("showlist");
          $('#' + idClose).removeClass("hidelist");
          this.checkClick = true;
        }, 1600);
      }
    }
  }

  // showDataHome() {
  //   this.DataHomeService.getDataHome().subscribe(data => {
  //     console.log(data)
  //   })
  // }


  nextImages(idblog) {
    if (this.checkclick_ == true) {
      this.resetBoolenCheck_(this.checkclick_, false, 0);

      var dlChuyenImage = this.getDulieuDeXulichuyenAnh(idblog);
      var tranlatex = dlChuyenImage.tranlatex_value_now - 601;

      if (tranlatex == -601) { dlChuyenImage.div.prev().fadeIn(200); }
      if (tranlatex >= dlChuyenImage.maxTranlateX) { this.changeTranlatex(dlChuyenImage.div, tranlatex); }
      if (tranlatex == dlChuyenImage.maxTranlateX) { dlChuyenImage.div.prev().prev().fadeOut(200); }
      this.resetBoolenCheck_(this.checkclick_, true, 700);
    }
  }

  getDulieuDeXulichuyenAnh(idblog) {
    var div = $("[id-blog=" + idblog + "]");
    var countDivImages = div.children(".slider").length;
    var maxTranlateX = -((countDivImages - 1) * 601);
    var tranlatex_value_now = parseInt(div.css('transform').split(',')[4]);

    return {
      "div": div,
      "countDivImages": countDivImages,
      "maxTranlateX": maxTranlateX,
      "tranlatex_value_now": tranlatex_value_now
    }
  }

  resetBoolenCheck_(bienset, loai, timeset) {
    setTimeout(() => {
      bienset = loai;
    }, timeset);
  }

  changeTranlatex(element, baonhieu) {
    element.css({
      "transform": "translateX(" + baonhieu + "px)"
    });
  }

  prevImages(idblog) {
    if (this.checkclick_ == true) {
      this.resetBoolenCheck_(this.checkclick_, false, 0);

      var dlChuyenImage = this.getDulieuDeXulichuyenAnh(idblog);
      var tranlatex = dlChuyenImage.tranlatex_value_now + 601;

      if (tranlatex == dlChuyenImage.maxTranlateX + 601) { dlChuyenImage.div.prev().prev().fadeIn(200); }
      if (tranlatex <= 0) { this.changeTranlatex(dlChuyenImage.div, tranlatex); }
      if (tranlatex == 0) { dlChuyenImage.div.prev().fadeOut(200); }
      this.resetBoolenCheck_(this.checkclick_, true, 700);
    }
  }

  showbinhluan(attributeName, idblog) {
    var div = $("["+ attributeName +"=" + idblog + "]");
    this.moveDivBinhluan(div);
  }

  moveDivBinhluan(div) {
    var check = div.hasClass("show-binh-luan");
    if (check == false) {
      var baonhieu = "auto";
      div.addClass('show-binh-luan');
    } else {
      var baonhieu = "0px";
      div.removeClass('show-binh-luan');
    }
    this.changeHeight(div, baonhieu);
  }

  changeHeight(element, baonhieu) {
    element.css({
      "height": baonhieu
    });
  }

  showFromTraloi(idblog, sttbinhluan) {
    var div = $("[idBlog-fromtraloi=" + idblog + "][stt-reply=" + sttbinhluan + "]");
    this.moveDivBinhluan(div);
  }
}
