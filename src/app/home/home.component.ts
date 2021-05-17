import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatablogsService } from '../services/datablogs.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ProvincesService } from '../services/provinces.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  user;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private datablog: DatablogsService,
    private userService: UserService,
    private ProvincesService: ProvincesService
  ) {
    this.user = JSON.parse(this.userService.getToken());
  }

  ngOnInit(): void {
    // this.showDataHome();
  }

  closeResult: string;

}
