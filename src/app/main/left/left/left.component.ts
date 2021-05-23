import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatablogsService } from '../../../services/datablogs.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ProvincesService } from '../../../services/provinces.service';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
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
  public allProvinces = [];
  public sodienthoai: number
  public diachi: string
  public thanhpho: number
  public user;

  public URL = 'http://localhost/app_togiveaway/api/upload';
  public uploader: FileUploader = new FileUploader({
    url: this.URL,
    maxFileSize: 15* 1024 * 1024,
    // allowedFileType: ['png', 'jpg']
  });

  public hasBaseDropZoneOver = true;
  public uploadedFile = []
  public selectedFile: File;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private datablog: DatablogsService,
    private userService: UserService,
    private ProvincesService: ProvincesService,
    private http: HttpClient

  ) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(this.userService.getToken());

    this.uploader.onAfterAddingFile = (fileItem: FileItem): any => {
        console.log('Uploader onAfterAddingFile', fileItem);
    };

    this.uploader.onBeforeUploadItem = (fileItem: FileItem): any => {
        console.log('Uploader onBeforeUploadItem', fileItem);
        return { fileItem };
    };

    this.uploader.onProgressItem = (progress: any) => {
        console.log('onProgressItem: ' + progress['propress']);
        // this.changeDetector.detectChanges();
    };

    this.uploader.onCompleteItem = (FileItem: FileItem): any => {
        console.log('Uploader onCompleteItem',FileItem);
        this.uploadedFile.push({
            name: FileItem.file.name,
            size: FileItem.file.size
        });
    };

    this.uploader.onCompleteAll = (): any => {
        this.uploader.clearQueue();
    }
  };

  public UploadAll() {
      this.uploader.uploadAll();
  }

  public fileOverBase(e: any) {
      this.hasBaseDropZoneOver = e;
  }

  subNhapLanDau(): void {
    if (this.diachi != null) {

      var idtp = $('#thanhpho').val();
      var idus = this.getIdUs();

      var data = {
        'idtp': idtp,
        'sodienthoai': this.sodienthoai,
        'diachi': this.diachi,
        'id': idus
      }

      this.userService.usNhapLanDau(data).subscribe(
        res => {
          if (res == 1) {
            this.openModalById("showFormNewMember_button");
            setTimeout(() => {
              this.checkAddNewBlog();
            }, 600);
          }
        }
      )
    }
  }

  openModalById(id) {
    document.getElementById(id).click();
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
    let files = e.target.files;
    let file;
    var lengthNow;
    var lengthFile = files.length;

    if (this.urlsImage.length > 0) {
      lengthNow = this.urlsImage.length;
    } else {
      lengthNow = 0;
    }
    for (let i = 0; i < lengthFile; i++){
      let data = {
        "id": this.bienDem,
        "files": files[i],
        "url": files[i].name,
      }
      this.urlsImage.push(data);
      this.bienDem++;

      let reader = new FileReader();
      file = files [i];
      reader.onload = (file) => {
        this.urlsImage[lengthNow + i]["dataURL"] = reader.result;
      }
      reader.readAsDataURL(file)
    }
    this.previewImages = true;
  }

  showFromTraloi(idblog, sttbinhluan) {
    var div = $("[idBlog-fromtraloi=" + idblog + "][stt-reply=" + sttbinhluan + "]");
    this.moveDivBinhluan(div);
  }

  uploadImage() {
    const uploadData = new FormData();
    for (let i = 0; i<this.urlsImage.length; i++) {
      uploadData.append('myFile[]', this.urlsImage[i]['files'], this.urlsImage[i]['url']);
    }
    this.http.post('http://localhost/app_togiveaway/api/?act=moveImageUpload', uploadData, {
      reportProgress: true,
    }).subscribe(event => {
      if (event == this.urlsImage.length) {
        console.log('upload thành công');
      } else {
        console.log('upload thất bại');
      }
    })
  }

  checkAddNewBlog() {
    var content = $('#contentBlog').val();
    if (content == '' && this.urlsImage.length == 0) {
      alert('Bạn chưa nhập nội dung');
    } else {
      var idUs = this.getIdUs();

      if (idUs != '') {
        var datetime = new Date().getTime();
        var arrayImage = this.getArrayImageToString();

        var data = this.getDataForBlog(content, arrayImage, idUs, datetime);
        this.uploadImage();
        this.addNewBlog(data);
      }
      else {
        console.log('ban chua dang nhap');
      }
    }
  }

  getArrayImageToString() {
    if (this.urlsImage.length > 0) {
      var Images = this.getArrayImage();
      var arrayImage = Images.toString();
    } else {
      var arrayImage = '';
    }
    return arrayImage;
  }

  addNewBlog(data) {
    this.datablog.addnewblog(data).subscribe(
      res => {  console.log(res);
        if (res == 1)
        {
          alert('Thêm thành công');
          $('#contentBlog').val('');
          this.urlsImage = [];
        }
        if (res == 0) // chưa nhập thông tin ///
        {
          if (this.allProvinces.length == 0) {
            this.ProvincesService.getAllProvinces().subscribe(
              respon => {
              this.allProvinces = respon['data'];
            });
          }
          document.getElementById("showFormNewMember_button").click();
        }
      }
    )
  }

  getDataForBlog(content, arrayImage, idUs, datetime) {
    var data = {
      "content": content,
      "images": arrayImage,
      "idUs": idUs,
      "date_create": datetime
    }
    return data
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

  getEmailUs() {
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    var token = loggedInUser.jwt
    var jwtDecodeToken = jwt_decode(token);
    var dataUs = jwtDecodeToken['data'];
    var emailUs = dataUs.email;
    return emailUs;
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
