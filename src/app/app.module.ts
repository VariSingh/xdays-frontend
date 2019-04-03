import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { DayComponent } from './day/day.component';
import { DayDetailsComponent } from './day-details/day-details.component';
import { CreateChallengeComponent } from './create-challenge/create-challenge.component';
import { AuthComponent } from './auth/auth.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token-interceptor';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddDayComponent } from './add-day/add-day.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChallengeComponent,
    DayComponent,
    DayDetailsComponent,
    CreateChallengeComponent,
    AuthComponent,
    AddDayComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    })
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
