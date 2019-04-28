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

  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private excelService: ExcelService
    ) { }

  ngOnInit() {
    this.buildSearchForm();
    this.searchResult(20);
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

  searchResult(ele = 50) {
    this.elements = [];
    for (let i = 1; i <= ele; i++) {
      this.elements.push(
        {
          description: i.toString(),
          type: 'type ' + i,
          amount: 'amount ' + i,
          balance: 'balance ' + i,
          remarks: 'remarks' + i,
          user: 'user' + i,
          dateTime: new Date()
        });
    }

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  exportXlxs() {
    this.excelService.exportAsExcelFile(this.elements, 'report');
  }

}
