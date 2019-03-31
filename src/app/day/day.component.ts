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
  public daysList: any[];
  public challengeId:string;
  ngOnInit() {
    this.getDays();
  }

  getDays() {
    this.challengeId = this.route.snapshot.params['challengeId'];
    this.dayService.getDaysOfChallenge(this.challengeId).subscribe((response: any) => {
      console.log(response);
      this.daysList = response;
    },
      (error: any) => {

      })
  }

}
