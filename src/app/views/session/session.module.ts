import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  MatProgressBarModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SigninComponent } from './signin/signin.component';
import { RouterModule } from '@angular/router';
import { SessionRoute } from './session-route';
import { CheckUsernameComponent } from './check-username/check-username.component';
import { SessionService } from './session.service';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [SigninComponent, CheckUsernameComponent, NotFoundComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    FlexLayoutModule,
    MatSelectModule,
    MatSnackBarModule,
    RouterModule.forChild(SessionRoute)
  ],
  providers: [SessionService]
})
export class SessionModule { }
