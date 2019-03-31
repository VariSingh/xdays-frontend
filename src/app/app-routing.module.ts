import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { DayComponent } from './day/day.component';

const routes: Routes = [  
  {
  path: 'login',
  component: LoginComponent,
},
{
  path: 'challenge',
  component: ChallengeComponent,
},
{
  path: 'day',
  component: DayComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
