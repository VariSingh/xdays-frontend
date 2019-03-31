import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../services/challenge.service';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  public challengeList:any;
  constructor(private challengeService:ChallengeService) { 

   
  }

  ngOnInit() {
    this.getChallengeList();
  }


  getChallengeList(){
     this.challengeService.getChallenges().subscribe(
      (res) => {
        console.log(res);
        this.challengeList = res;
      },
      (error) => {
         console.log(error);
      }
  );
  }

}
