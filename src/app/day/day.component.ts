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
  disableButton = false;
  ngOnInit() {
    this.getDays();
  }

  dateDiff(date1: any, date2: any) {
    // find difference in days between date1 and date2
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  subtractDate(date: Date, n: number) {
    // Subtract n days from date
    const d = new Date(date);
    const currentDate = d.getDate();
    d.setDate(currentDate - n);
    return d;
  }

  matchDate(date: Date, daysList: any[]) {
    // console.log(date);
    // console.log(daysList);
    for (let i = 0; i < daysList.length; i++) {
      const diff = this.dateDiff(daysList[i].date, date);
      if (diff === 1) {// day matched. Make it zero later
        return daysList[i];
        // break;
      }
    }
  }

  getDays() {
    this.challengeId = this.route.snapshot.params.challengeId;
    this.dayService.getDaysOfChallenge(this.challengeId).subscribe((response: any) => {
      console.log(response);
      const challengeDetails = response.challengeDetails;
      // this.totalDays = new Array(response.challengeDetails.number_of_days);
      this.daysList = response.daysList;

      const start_date = new Date(challengeDetails.start_date);


      // const filterChallengeDays = this.daysList.filter((item: any) => {
      //   const d = new Date(item.date);
      //   return d > start_date;
      // });
      const disableDaysList = this.findDisableDays();

      console.log(disableDaysList.length);
      console.log(challengeDetails.completed_days);
      if (challengeDetails.completed_days == disableDaysList.length) { // all days are filled
        this.disableButton = true;
      }

      localStorage.setItem('disableDays', JSON.stringify(disableDaysList));
      localStorage.setItem('disableUntil', this.findDisableUntil(start_date));
    },
      (error: any) => {

      });
  }

  findDisableDays() {
    return this.daysList.map((item: any) => {
      const d = new Date(item.date);
      return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
    });
  }

  findDisableUntil(start_date: Date) {
    // find the date before which all days should be disabled in calendar


    // find start date
    const sd = new Date(start_date);
    sd.setHours(0, 0, 0, 0);
    sd.setDate(sd.getDate() - 1);

    // find today date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // find date 7 days back
    const dMinus7 = new Date();
    dMinus7.setHours(0, 0, 0, 0);
    dMinus7.setDate(dMinus7.getDate() - 7);

    let disableDate: Date;

    if (sd > dMinus7 && sd < today) {
      disableDate = sd;
    } else if (sd > today) {
      disableDate = today;
      this.disableButton = true; // challenge not started yet so disable 'Add progress' button
    } else {
      disableDate = dMinus7;
    }

    return JSON.stringify({ year: disableDate.getFullYear(), month: disableDate.getMonth() + 1, day: disableDate.getDate() });
  }



}
