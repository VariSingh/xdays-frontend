import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,public location: Location,public router:Router) {
    // subscribe to router event
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      localStorage.setItem("token", params.token);
      this.location.replaceState('auth');
      this.router.navigateByUrl('/mychallenges');
    });
  
  }

  ngOnInit() {

   // console.log();

  }

}
