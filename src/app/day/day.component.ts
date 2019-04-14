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
      const disableDaysList = this.daysList.map((item: any) => {
        const d = new Date(item.date);
        return {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()};
      });
      localStorage.setItem('disableDays', JSON.stringify(disableDaysList));
    },
      (error: any) => {

      });
  }

}
