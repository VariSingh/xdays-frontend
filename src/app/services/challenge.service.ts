import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import{ environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  constructor(private http: HttpClient) { }

  getChallenges(){
    return this.http.get(`${environment.url}/challenge`);
  }

  create(body:any)
  {
    return this.http.post(`${environment.url}/challenge`,body,{});
  }

  addDay(challengeId: string, body: any) {
    return this.http.post(`${environment.url}/challenge/${challengeId}/days`, body, {});
  }
}
