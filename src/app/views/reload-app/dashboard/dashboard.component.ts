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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  elements: any = [];
  previous: any = [];
  headElements = ['Description', 'Type', 'Amount', 'Balance', 'Remarks', 'User', 'Date Time'];

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    for (let i = 1; i <= 15; i++) {
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

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

}
