import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.component.html',
  styleUrls: ['./day-details.component.css']
})
export class DayDetailsComponent implements OnInit {
  isReadOnly:boolean;
  constructor() { }

  ngOnInit() {
    this.isReadOnly = true;
  }

  update(){
    alert("updated");
  }
}
