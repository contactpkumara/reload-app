import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {

  public reloadForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.buildReloadForm();
  }

  buildReloadForm() {
    this.reloadForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      operator: ['', Validators.required],
      ammount: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  recharge() {
    console.log(this.reloadForm.value);
    this.snackBar.open(
      'Successfully Recharge : Rs.' + this.reloadForm.value.ammount + ' to +94' + this.reloadForm.value.phoneNumber,
      'close',
      { duration: 3000 }
    );
  }

}
