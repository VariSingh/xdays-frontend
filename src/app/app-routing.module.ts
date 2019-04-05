import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { DayComponent } from './day/day.component';
import { DayDetailsComponent } from './day-details/day-details.component';
import { CreateChallengeComponent } from './create-challenge/create-challenge.component';
import { AuthComponent } from './auth/auth.component';
import { CreateDayComponent } from './create-day/create-day.component';

const routes: Routes = [ 
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  {
  path: 'login',
  component: LoginComponent,
},
{
  path: 'mychallenges',
  component: ChallengeComponent,
},
{
  path: 'challenge/create',
  component: CreateChallengeComponent,
},
{
  path: 'challenge/:challengeId',
  component: DayComponent,
},
{
  path: 'challenge/:challengeId/day/create',
  component: CreateDayComponent,
},
{
  path: 'challenge/:challengeId/day/:dayId',
  component: DayDetailsComponent,
},
{
  path: 'auth',
  component: AuthComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
