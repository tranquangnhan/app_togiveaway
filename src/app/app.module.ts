import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './home/home.component';
// import { MenuleftComponent } from './menuleft/menuleft.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './auth.interceptor';
import { LeftComponent } from './main/left/left/left.component';
import { MenuComponent } from './main/menu/menu/menu.component';
import { FileUploadModule } from "ng2-file-upload";
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ChatroomComponent } from './chatroom/chatroom.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import { DatePipe } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent,
    BodyComponent,
    HomeComponent,
    LeftComponent,
    MenuComponent,
    ChatroomComponent,
    // MenuleftComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    JwtModule,
    FileUploadModule,
    Ng2OrderModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    // DatePipe
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '752282827765-lt7h82ui6gq2p9phkf4v7m1afp22c5h3.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    } ,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
