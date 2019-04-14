import { DayService } from './../services/day.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChallengeService } from '../services/challenge.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-create-day',
  templateUrl: './create-day.component.html',
  styleUrls: ['./create-day.component.css']
})
export class CreateDayComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private challengeService: ChallengeService, public toastr: ToastrService, public router: Router, public route: ActivatedRoute, public dayService: DayService) { }
  dayForm: FormGroup;
  challengeId: string;
  submit = false;
  d: Date = new Date();
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy'
  };

  ngOnInit() {
    const ds = new Date();
    const du = new Date();

    ds.setDate(ds.getDate() + 1);
    du.setDate(du.getDate() - 7);

    this.myDatePickerOptions.disableSince = { year: ds.getFullYear(), month: ds.getMonth() + 1, day: ds.getDate() }
    this.myDatePickerOptions.disableUntil = { year: du.getFullYear(), month: du.getMonth() + 1, day: du.getDate() }
    if (localStorage.getItem('disableDays')) {
      this.myDatePickerOptions.disableDays = JSON.parse(localStorage.getItem('disableDays'));
    } else {
      this.router.navigateByUrl('login');
    }

    this.dayForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: [{ date: { year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate() } }, Validators.required]
    });
    // this.setDate();

    // this.dayForm.controls.date.patchValue({ date: '2019-11-11' });

    this.challengeId = this.activeRoute.snapshot.params.challengeId;
    this.getDays();
  }

  getDays() {
    //this.challengeId = this.route.snapshot.params.challengeId;
    this.dayService.getDaysOfChallenge(this.challengeId).subscribe((response: any) => {
      console.log(response);
      const challengeDetails = response.challengeDetails;
      const dayList = response.daysList;
    },
      (error: any) => {

      });
  }

  setDate(): void {
    // Set today date using the patchValue function
    const date = new Date();
    this.dayForm.patchValue({
      date: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }

  clearDate(): void {
    // Clear the date using the patchValue function
    this.dayForm.patchValue({ myDate: null });
  }

  reformatDate(date: any) {
    const d: Date = new Date();
    d.setDate(date.date.day);
    d.setMonth(date.date.month - 1);
    d.setFullYear(date.date.year);
    return d;
  }

  addDay() {
    this.submit = true;
    console.log(this.dayForm);
    if (this.dayForm.invalid) {
      return;
    }


    const data = {
      description: this.dayForm.controls.description.value,
      date: this.reformatDate(this.dayForm.controls.date.value)
    };

    this.challengeService.addDay(this.challengeId, data).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('', 'Progress added');
        setTimeout(() => {

          this.router.navigateByUrl(`/challenge/${this.challengeId}`);
        }, 2000);
      },
      (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Error');
      });
  }

}
