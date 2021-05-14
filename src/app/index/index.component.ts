import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { DatablogsService } from '../datablogs.service';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  loginForm: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean;
  private loggedUserSubject: BehaviorSubject<any>;
  public loggedInUser: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private router:Router,
    private datablog: DatablogsService
    ) {
      var getLoggedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      this.loggedUserSubject = new BehaviorSubject(getLoggedUser);
      this.loggedInUser = this.loggedUserSubject.asObservable();
  }
  
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);


      if(this.socialUser)
      {
        console.log(this.socialUser);
        var data ={
          id:this.socialUser.id,
          name:this.socialUser.name,
          email:this.socialUser.email,
          kind: 0,
          photoUrl: this.socialUser.photoUrl
        }

        this.datablog.addHero(data).subscribe(data=>{
          localStorage.setItem('loggedInUser', JSON.stringify(data));
          this.loggedUserSubject.next(data);
          console.log(data);
          return data;
          
        },
        error => {
            console.log(error);
        });

      }


    });
  }
  loginWithGoogle(): void {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
