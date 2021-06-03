import { AfterViewInit, Component, ElementRef } from '@angular/core';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: 'AIzaSyB0WFQhz4tVnBW5dM5IvIVxZN-o1BODbCI',
  databaseURL: 'https://realtimechatapp-64739-default-rtdb.firebaseio.com'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef){
    firebase.initializeApp(config);
  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#EDF2F3';
  }
  title = 'appchovanhan';
}
