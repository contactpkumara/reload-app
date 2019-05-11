import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ReloadAppService } from '../reload-app.service';
import { AppLoaderService } from './../../../shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-dth-reload',
  templateUrl: './dth-reload.component.html',
  styleUrls: ['./dth-reload.component.scss']
})
export class DthReloadComponent implements OnInit {

  public reloadForm: FormGroup;
  public userObj = JSON.parse(localStorage.getItem('userObj'));
  public spList = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private reloadService: ReloadAppService,
    private loader: AppLoaderService
  ) { }

  ngOnInit() {
    this.buildReloadForm();
    this.getSpList();
  }

  buildReloadForm() {
    this.reloadForm = this.fb.group({
      customermobno: ['', Validators.required],
      serviceoperatorid: ['', Validators.required],
      amount: ['', Validators.required],
      stvtype: ['', Validators.required]
    });
  }

  recharge() {
    this.loader.open('Loading');
    const reloadData = this.reloadForm.value;
    reloadData.userid = this.userObj.loginEmployeeId;
    this.reloadService.dthReload(reloadData)
      .subscribe(response => {
        this.loader.close();
        this.reloadForm.reset();
        this.reloadForm.markAsUntouched();
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
        // console.log(error);
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
        // console.log(error);
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
