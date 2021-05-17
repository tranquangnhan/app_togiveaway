import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatablogsService } from '../../../services/datablogs.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ProvincesService } from '../../../services/provinces.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: [
    './left.component.css',
    '../../../home/home.component.css'
  ]
})
export class LeftComponent implements OnInit {
  public urlsImage = [];
  public bienDem = 0;
  public previewImages = false;
  public checkclick_ = true;
  public showModal: boolean = false;
  public allProvinces;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private datablog: DatablogsService,
    private userService: UserService,
    private ProvincesService: ProvincesService
  ) { }

  ngOnInit(): void {
  }

  removeImage(id) {
    for (let i = 0; i < this.urlsImage.length; i++) {
      if (id == this.urlsImage[i].id) {
        this.urlsImage.splice(i, 1);
      }
    }
  }

  detailImage(e) {
    var chilren = $('.box_img_detail').children();
    if (chilren.length > 0) {
      chilren.remove();
    }
    var currentSrc = e.target.currentSrc;
    var img = '<img src="' + currentSrc + '" class="img-fluid" alt="">'
    $('.box_img_detail').append(img);
    document.getElementById("imageDetail_button").click();
  }

  addImage(e) {
    if (e.target.files.length == 1) {
      this.previewImages = true;
      var data = {
        "id": this.bienDem,
        "url": e.target.files[0].name
      }
      this.urlsImage.push(data);
      this.bienDem++;
    }
  }

  showFromTraloi(idblog, sttbinhluan) {
    var div = $("[idBlog-fromtraloi=" + idblog + "][stt-reply=" + sttbinhluan + "]");
    this.moveDivBinhluan(div);
  }

  addnewblog() {
    var content = $('#contentBlog').val();
    if (content == '' && this.urlsImage.length == 0) {
      alert('Bạn chưa nhập nội dung');
    } else {
      var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
      var token = loggedInUser.jwt
      var jwtDecodeToken = jwt_decode(token);
      var dataUs = jwtDecodeToken['data'];
      var emailUs = dataUs.email;

      if (loggedInUser != '') {
        var datetime = new Date().getTime();
        // var ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        // var datetimez = new Date().getTime();
        // var datetime = date.getFullYear() + '-' + date.getMonth() + '-' + date.getSeconds() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        if (this.urlsImage.length > 0) {

          var Images = this.getArrayImage();
          arrayImage = Images.toString()

        } else {
          var arrayImage = '';
        }

        var data = {
          "content": content,
          "images": arrayImage,
          "emailUser": emailUs,
          "date_create": datetime
        }

        console.log(data);
        this.datablog.addnewblog(data).subscribe(
          res => {
            if (res == 1)
            {
              alert('Thêm thành công');
              $('#contentBlog').val('');
              this.urlsImage = [];
            } else // chưa nhập thông tin ///
            {
              if (this.allProvinces == '') {
                this.ProvincesService.getAllProvinces().subscribe(
                  respon => {
                  this.allProvinces = respon['data'];
                  console.log(this.allProvinces);
                });
              }
              document.getElementById("showFormNewMember_button").click();
            }
          }
        )
      }
      else {
        console.log('ban chua dang nhap');
      }
    }
  }

  getArrayImage() {
    var arrayImage = [];
    for (let i = 0; i < this.urlsImage.length; i++) {
      arrayImage.push(this.urlsImage[i].url);
    }
    return arrayImage;
  }

  resetBoolenCheck_(bienset, loai, timeset) {
    setTimeout(function () {
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
      this.checkclick_ = false;
      var dlChuyenImage = this.getDulieuDeXulichuyenAnh(idblog);
      var tranlatex = dlChuyenImage.tranlatex_value_now + 601;

      if (tranlatex == dlChuyenImage.maxTranlateX + 601) { dlChuyenImage.div.prev().prev().fadeIn(200); }
      if (tranlatex <= 0) { this.changeTranlatex(dlChuyenImage.div, tranlatex); }
      if (tranlatex == 0) { dlChuyenImage.div.prev().fadeOut(200); }
      setTimeout(() => {
        this.checkclick_ = true;
      }, 700);
    }
  }

  showbinhluan(attributeName, idblog) {
    var div = $("[" + attributeName + "=" + idblog + "]");
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

  nextImages(idblog) {
    if (this.checkclick_ == true) {
      this.checkclick_ = false;

      var dlChuyenImage = this.getDulieuDeXulichuyenAnh(idblog);
      var tranlatex = dlChuyenImage.tranlatex_value_now - 601;

      if (tranlatex == -601) { dlChuyenImage.div.prev().fadeIn(200); }
      if (tranlatex >= dlChuyenImage.maxTranlateX) { this.changeTranlatex(dlChuyenImage.div, tranlatex); }
      if (tranlatex == dlChuyenImage.maxTranlateX) { dlChuyenImage.div.prev().prev().fadeOut(200); }
      setTimeout(() => {
        this.checkclick_ = true;
      }, 700);
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
}
