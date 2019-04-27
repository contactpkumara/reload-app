import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { AppLoaderService } from 'src/app/shared/services/app-loader/app-loader.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-check-username',
  templateUrl: './check-username.component.html',
  styleUrls: ['./check-username.component.scss']
})
export class CheckUsernameComponent implements OnInit {

  public checkUserNameForm: FormGroup;
  public errorMessage: any;
  public successUrl = 'session/signin';

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    private loader: AppLoaderService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.buildSignifForm();
  }

  buildSignifForm() {
    this.checkUserNameForm = this.fb.group({
      userName: ['', Validators.required]
    });
  }

  checkUserName() {
    console.log(this.checkUserNameForm.value);
    this.loader.open('Loading');
    this.sessionService.checkUserName(this.checkUserNameForm.value)
      .subscribe(response => {
        this.loader.close();
        if (response.retFlag === '0') {
          console.log(response);
          this.router.navigate([this.successUrl]);
        } else {
          this.errorMessage = response.retMsg;
        }
      },
      error => {
        this.loader.close();
        if (error.status === 500) {
          this.snackBar.open(
            'Somthing went wrong. Please try again!',
            'close',
            { duration: 3000 }
          );
        }
      });
  }

}
