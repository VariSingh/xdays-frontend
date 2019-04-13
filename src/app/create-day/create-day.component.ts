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

  constructor(private formBuilder: FormBuilder, private activeRoute: ActivatedRoute, private challengeService: ChallengeService, private toastr: ToastrService, private router: Router) { }
  dayForm: FormGroup;
  challengeId: string;
  submit: boolean = false;
  d: Date = new Date();
  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy'
  };

  ngOnInit() {
    let ds = new Date();
    let du = new Date();

    ds.setDate(ds.getDate() + 1);
    du.setDate(du.getDate() - 7);

    this.myDatePickerOptions.disableSince = { year: ds.getFullYear(), month: ds.getMonth() + 1, day: ds.getDate() }
    this.myDatePickerOptions.disableUntil = { year: du.getFullYear(), month: du.getMonth() + 1, day: du.getDate() }
    
    this.dayForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: [{ date: { year: this.d.getFullYear(), month: this.d.getMonth() + 1, day: this.d.getDate() } }, Validators.required]
    });
    //this.setDate();

    //this.dayForm.controls.date.patchValue({ date: '2019-11-11' });

    this.challengeId = this.activeRoute.snapshot.params.challengeId;
  }

  setDate(): void {
    // Set today date using the patchValue function
    let date = new Date();
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

  addDay() {
    this.submit = true;
    console.log(this.dayForm);
    if (this.dayForm.invalid) {
      return;
    }

    let data = {
      description: this.dayForm.controls.description.value,
      date: this.dayForm.controls.date.value
    }

    this.challengeService.addDay(data).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('', 'Progress added');
        setTimeout(() => {

          this.router.navigateByUrl(`/challenge/${this.challengeId}`)
        }, 2000);
      },
      (error) => {
        console.log(error);
        this.toastr.error(error, 'Oops! Something went wrong');
      })
  }

}
