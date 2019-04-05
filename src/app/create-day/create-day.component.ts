import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChallengeService } from '../services/challenge.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-day',
  templateUrl: './create-day.component.html',
  styleUrls: ['./create-day.component.css']
})
export class CreateDayComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private activeRoute: ActivatedRoute, private challengeService: ChallengeService, private toastr: ToastrService, private router: Router) { }
  dayForm: FormGroup;
  challengeId:string;
  submitted: boolean = false;

  ngOnInit() {
    this.dayForm = this.formBuilder.group({
      description: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.challengeId = this.activeRoute.snapshot.params.challengeId;
  }


  addDay() {
    this.submitted = true;
    if (this.dayForm.invalid) {
      return;
    }

    let data = {
      description: this.dayForm.controls.description.value,
      date: this.dayForm.controls.date.value
    }
    console.log(data);
    // this.challengeService.addDay(data).subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.toastr.success('', 'Progress added');
    //     setTimeout(() => {

    //       this.router.navigateByUrl(`/challenge/${this.challengeId}`)
    //     }, 2000);
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.toastr.error(error, 'Oops! Something went wrong');
    //   })
  }

}
