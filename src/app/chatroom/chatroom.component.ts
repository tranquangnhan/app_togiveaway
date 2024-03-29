import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';
import jwt_decode from "jwt-decode";
// import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public dataUsFollow;
  public fIdus;
  public idus;

  matcher = new MyErrorStateMatcher();

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    // public datepipe: DatePipe
    private activatedRoute: ActivatedRoute
  ) {
      var url = this.router.url;
      console.log(url);
      var indOfM = url.indexOf('m');
      this.fIdus = url.substring(indOfM + 2 , url.indexOf('/', indOfM + 2));
      this.idus  = url.substring(url.lastIndexOf('/') + 1, url.length);
      console.log();

      var arrId = [this.fIdus, this.idus];
      console.log(arrId);
   }

  ngOnInit(): void {
    this.getAllUsFollowto();
  }

  getAllUsFollowto() {
    var account_id = this.getIdaccountUs();
    this.userService.getUsFollowtoById(account_id).subscribe(
      res => {
        this.dataUsFollow = res;
      }
    )
  }

  outChatRoom() {
    this.router.navigate(['/home']);
  }

  getIdaccountUs() {
    var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    var token = loggedInUser.jwt
    var jwtDecodeToken = jwt_decode(token);
    var dataUs = jwtDecodeToken['data'];
    var idUs = dataUs.id;
    return idUs;
  }


  getIdUs(idaccount) {
    return this.userService.getUsIdByIdaccount(idaccount).subscribe(
      res => {
        this.idus = res['id'];
      }
    );
  }

}
