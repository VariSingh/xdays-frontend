import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ChallengeService } from '../services/challenge.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.css']
})
export class CreateChallengeComponent implements OnInit {

  challengeForm: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, public challengeService:ChallengeService,private toastr:ToastrService,private router:Router) { }

  ngOnInit() {

    this.challengeForm = this.formBuilder.group({
      challengeName: ['', Validators.required],
      challengeDescription:['', Validators.required],
      challengeStartDate:['', Validators.required],
      numberOfDays: ['', Validators.required],
      penality: ['', Validators.required],
    });


  
  
  }

  createChallenge() {

    this.submitted = true;
    if (this.challengeForm.invalid) {
      return;
    }  
    

    let body =   {
  		  "name":this.challengeForm.controls.challengeName.value,
        "description": this.challengeForm.controls.challengeDescription.value,
        "start_date": this.challengeForm.controls.challengeStartDate.value,
        "number_of_days":this.challengeForm.controls.numberOfDays.value,
        "penality":this.challengeForm.controls.penality.value
  }

    this.challengeService.create(body).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('', 'Challenge created');
        setTimeout(()=>{
          this.router.navigateByUrl('mychallenges')
         },2000);
      },
      (error) => {
         console.log(error);
         this.toastr.success(error, 'Oops! Something went wrong');
      })
  }

}
