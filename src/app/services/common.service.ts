import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public router: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('disableDays');
    localStorage.removeItem('disableUntil');
    this.router.navigateByUrl('login');
  }
}
