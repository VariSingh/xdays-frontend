import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ChallengeService } from '../services/challenge.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.css']
})
export class CreateChallengeComponent implements OnInit {

  challengeForm: FormGroup;
  submitted = false;
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy'
  };
  constructor(private formBuilder: FormBuilder, public challengeService: ChallengeService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {

    this.challengeForm = this.formBuilder.group({
      challengeName: ['', Validators.required],
      challengeDescription: ['', Validators.required],
      challengeStartDate: [null, Validators.required],
      numberOfDays: ['', Validators.required],
      penality: ['', Validators.required],
    });

    const du = new Date();
    du.setDate(du.getDate() - 1);

    this.myDatePickerOptions.disableUntil = { year: du.getFullYear(), month: du.getMonth() + 1, day: du.getDate() }



  }

  clearDate(): void {
    // Clear the date using the patchValue function
    this.challengeForm.patchValue({ challengeStartDate: null });
  }

  reformatDate(date: any) {
    const d: Date = new Date();
    d.setDate(date.date.day);
    d.setMonth(date.date.month - 1);
    d.setFullYear(date.date.year);
    return d;
  }

  createChallenge() {

    this.submitted = true;
    if (this.challengeForm.invalid) {
      return;
    }


    const body = {
      name: this.challengeForm.controls.challengeName.value,
      description: this.challengeForm.controls.challengeDescription.value,
      start_date: this.reformatDate(this.challengeForm.controls.challengeStartDate.value),
      number_of_days: this.challengeForm.controls.numberOfDays.value,
      penality: this.challengeForm.controls.penality.value
    };

    this.challengeService.create(body).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('', 'Challenge created');
        setTimeout(() => {
          this.router.navigateByUrl('mychallenges');
        }, 2000);
      },
      (error) => {
        console.log(error);
        this.toastr.success(error, 'Oops! Something went wrong');
      });
  }

}
