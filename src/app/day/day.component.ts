import { Component, OnInit } from '@angular/core';
import { DayService } from '../services/day.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  constructor(private dayService: DayService, private route: ActivatedRoute) { }
  daysList: any[] = [];
  challengeId: string;
  totalDays: any[];
  ngOnInit() {
    this.getDays();
  }

  dateDiff(date1: any, date2: any) {
    //find difference in days between date1 and date2
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  subtractDate(date: Date, step: number) {
    const d = new Date(date);
    const currentDate = d.getDate();
    d.setDate(currentDate - 1);
    return d;
  }

  matchDate(date: Date, daysList: any[]) {
    //console.log(date);
    //console.log(daysList);
    for(let i=0;i<daysList.length;i++){
      let diff = this.dateDiff(daysList[i].date,date);
      //console.log(daysList[i].date+" "+date+" "+diff);
      if(diff==1){//day matched. Make it zero later
          return daysList[i];
        // break;
      }
    }
  }

  getDays() {
    this.challengeId = this.route.snapshot.params['challengeId'];
    this.dayService.getDaysOfChallenge(this.challengeId).subscribe((response: any) => {
      console.log(response);
      const challengeDetails = response.challengeDetails;
     // this.totalDays = new Array(response.challengeDetails.number_of_days);
      this.daysList = response.daysList;


      //const startDate = new Date(challengeDetails.start_date);
      //const today = new Date();
      //find difference in days
    //  console.log(this.dateDiff(startDate, today));

      //create an array starting from 7 days behind today till today;
      //let date = new Date();
      //let arr = [];
     // for (let i = 0; i < 7; i++) {

        //search if there is any entry for this day; if yes then use it instead of obj
       // console.log(date);
       // let match = this.matchDate(date, this.daysList);
       // let obj :any;
       // if(match){
       //   obj = match;
       // }else{
       //   obj = {
       //     challenge: challengeDetails._id,
       //     date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T00:00:00.000Z`,
       //     description: ''
      //    }
     //   }
       // arr.push(obj);
       // date = this.subtractDate(date, 1);
     // }
     // console.log(arr);

      //todo: if start date is greater than today then show total Days
      //else
      //don't show anything

      //in total days show data in those days which are filled.
      //-----------------------------------
      //if start date is lesser than today then show count(today-startdate) days list
      //if count(today-startdate) is greater than 7 then calculate 7 days only.
      //blank days will only be shown for past 7 days . Before that show days as it is.

    },
      (error: any) => {

      })
  }

}
