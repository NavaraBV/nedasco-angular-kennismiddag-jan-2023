import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ElementsDataSource, TableWithPaginationItem } from './elements-data.source';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-element-list',
  templateUrl: './table-with-pagination.component.html',
  styleUrls: ['./table-with-pagination.component.scss']
})
export class ElementListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableWithPaginationItem>;
  dataSource: ElementsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  public pageSize: number = 10;
  public pageIndex: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.dataSource = new ElementsDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    this.route.queryParamMap.subscribe((paramMap)=>{
      const pageIndex = Number(paramMap.get('pageIndex'));
      const pageSize = Number(paramMap.get('pageSize'));
      if(pageSize){
        this.pageSize = pageSize
        this.paginator.pageSize = pageSize
      }
      if(pageIndex){
        this.pageIndex = pageIndex
        this.paginator.pageIndex = pageIndex
      }
    });
  }

  goToDetail(row: {id: number, name: string}) {
    this.router.navigate(['elements', row.id], {state: row});
  }

  updateUrl($event: PageEvent) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          pageIndex: $event.pageIndex,
          pageSize: $event.pageSize
        },
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }
}
