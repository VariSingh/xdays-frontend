import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url = environment.url;

  constructor(private router: Router) {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/mychallenges');
    }
  }

  ngOnInit() {

  }
}
