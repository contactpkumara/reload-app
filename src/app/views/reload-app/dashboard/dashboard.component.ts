import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  MdbTablePaginationComponent,
  MdbTableDirective
} from 'angular-bootstrap-md';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { DatePipe } from '@angular/common';
import { ReloadAppService } from '../reload-app.service';
import { AppLoaderService } from 'src/app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  public elements: any = [];
  public previous: any = [];
  public headElements = ['Description', 'Type', 'Amount', 'Balance', 'Remarks', 'User', 'Date Time'];
  public searchForm: FormGroup;
  private fromDate = new Date();
  private toDate = new Date();

  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private excelService: ExcelService,
    private datePipe: DatePipe,
    private reloadAppService: ReloadAppService,
    private loader: AppLoaderService
    ) { }

  ngOnInit() {
    this.toDate.setDate(this.toDate.getDate() - 30);
    const frDate = this.datePipe.transform(this.fromDate, 'yyyy-MM-dd');
    const tDate = this.datePipe.transform(this.toDate, 'yyyy-MM-dd');
    const userObj = JSON.parse(localStorage.getItem('userObj'));
    const searchObj = {
      userId: userObj.loginEmployeeId,
      transType: 3,
      fromDate: frDate,
      toDate: tDate
    }
    this.buildSearchForm();
    this.searchResult(searchObj);
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(15);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  buildSearchForm() {
    this.searchForm = this.fb.group({
      transType: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  searchResult(searchObj: any = false) {
    this.elements = [];
    if (searchObj) {
      searchObj = searchObj;
    } else {
      this.loader.open('Loading');
      searchObj = this.searchForm.value;
    }
    this.reloadAppService.getAccountStatement(searchObj)
      .subscribe(response => {
        this.createJsonArray(response);
        this.loader.close();
      },
      error => {
        this.loader.close();
        console.log(error);
      });
  }

  exportXlxs() {
    this.excelService.exportAsExcelFile(this.elements, 'report');
  }

  createJsonArray(dataArray) {
    dataArray.forEach(element => {
      const data = {
        description: element[1],
        type: element[2],
        amount: element[3],
        balance: element[4],
        remarks: element[5],
        user: element[6],
        dateTime: element[7]
      };
      this.elements.push(data);
    });
    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

}
