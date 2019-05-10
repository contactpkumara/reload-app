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
import { MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { DatePipe } from '@angular/common';
import { ReloadAppService } from '../reload-app.service';
import { AppLoaderService } from 'src/app/shared/services/app-loader/app-loader.service';

@Component({
  selector: 'app-bank-acc-statement',
  templateUrl: './bank-acc-statement.component.html',
  styleUrls: ['./bank-acc-statement.component.scss']
})
export class BankAccStatementComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  public searchObj: any;
  public headElements = ['Date Time', 'User', 'Description', 'Credit', 'Debit', 'Amount', 'Balance', 'Remarks'];
  public searchForm: FormGroup;
  private fromDate = new Date();
  private toDate = new Date();
  public userObj = JSON.parse(localStorage.getItem('userObj'));
  public dataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
    this.searchObj = {
      userId: this.userObj.loginEmployeeId,
      transType: 3,
      fromDate: tDate,
      toDate: frDate
    };
    this.buildSearchForm();
    this.searchResult(this.searchObj);
  }

  buildSearchForm() {
    this.searchForm = this.fb.group({
      transType: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  searchResult(searchObj: any = false) {
    if (searchObj) {
      searchObj = searchObj;
    } else {
      this.loader.open('Loading');
      searchObj = this.searchForm.value;
    }
    searchObj['userId'] = this.userObj.loginEmployeeId;
    this.reloadAppService.getAccountStatement(searchObj)
      .subscribe(response => {
        console.log(response);
        this.loader.close();
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        this.loader.close();
        console.log(error);
      });
  }

  exportXlxs() {
    this.excelService.exportAsExcelFile(this.dataSource, 'report');
  }

  cleatInput() {
    this.searchForm.reset();
    this.searchForm.markAsUntouched();
    this.searchResult(this.searchObj);
  }

}
