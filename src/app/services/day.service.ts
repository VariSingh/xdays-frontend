import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import{ environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(private http: HttpClient) { }

  getDaysOfChallenge(challenge:string){
    return this.http.get(`${environment.url}/challenge/${challenge}/days`);
  }
}
