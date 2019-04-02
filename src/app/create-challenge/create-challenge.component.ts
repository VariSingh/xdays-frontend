import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-challenge',
  templateUrl: './create-challenge.component.html',
  styleUrls: ['./create-challenge.component.css']
})
export class CreateChallengeComponent implements OnInit {

  challengeForm: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.challengeForm = this.formBuilder.group({
      challengeName: ['', Validators.required],
      numberOfDays: ['', Validators.required],
      penality: ['', Validators.required],
    });
  }

  createChallenge() {
    this.submitted = true;
    if (this.challengeForm.invalid) {
      return;
    }  
  }

}
