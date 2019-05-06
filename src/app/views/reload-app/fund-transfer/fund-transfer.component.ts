import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ReloadAppService } from '../reload-app.service';
import { AppLoaderService } from './../../../shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-fund-transfer',
  templateUrl: './fund-transfer.component.html',
  styleUrls: ['./fund-transfer.component.scss']
})
export class FundTransferComponent implements OnInit {

  public fundTransferForm: FormGroup;
  public userObj = JSON.parse(localStorage.getItem('userObj'));
  public spList = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private reloadService: ReloadAppService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.buildfundTransferForm();
    this.getSpList();
  }

  buildfundTransferForm() {
    this.fundTransferForm = this.fb.group({
      benificiaryId: ['', Validators.required],
      amount: ['', Validators.required],
      remarks: ['', Validators.required]
    });
  }

  recharge() {
    this.loader.open('Loading');
    const reloadData = this.fundTransferForm.value;
    reloadData.userid = this.userObj.loginEmployeeId;
    this.reloadService.fundTransfer(reloadData)
      .subscribe(response => {
        this.loader.close();
        this.fundTransferForm.reset();
        this.fundTransferForm.markAsUntouched();
        this.snackBar.open(
          response[0].returnmessage,
          'close',
          { duration: 3000 }
        );
      },
      error => {
        this.loader.close();
        this.snackBar.open(
          'Somthing went wrong, Please try again!',
          'close',
          { duration: 3000 }
        );
        console.log(error);
      });
  }

  getSpList() {
    const spListData = {
      serviceid: '1',
      subserviceid: '1',
      userid: this.userObj.loginEmployeeId
    };
    this.reloadService.getSpList(spListData)
      .subscribe(response => {
        // console.log(response);
        this.convertArrayToJson(response);
      },
      error => {
        console.log(error);
      });
  }

  convertArrayToJson(dataArray) {
    dataArray.forEach(element => {
      this.spList.push({
        id: element[0],
        name: element[1]
      });
    });
  }

}
