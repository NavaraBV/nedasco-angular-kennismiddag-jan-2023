import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort, SortDirection} from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ElementsDataSource, TableWithPaginationItem } from './elements-data.source';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.scss']
})
export class ElementListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableWithPaginationItem>;
  dataSource: ElementsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  public pageSize: number = 3;
  public pageIndex: number = 0;
  public sortColumn: string = '';
  public sortDirection: SortDirection = 'asc';

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
        this.pageSize = pageSize;
      }
      if(pageIndex) {
        this.pageIndex = pageIndex;
      }
      this.sortColumn = paramMap.get('sortColumn') ?? '';
      this.sortDirection = paramMap.get('sortDirection') as SortDirection ?? 'asc';
    });
  }

  goToDetail(row: {id: number, name: string}) {
    this.router.navigate([row.id], {relativeTo: this.route});
  }

  updatePagination($event: PageEvent) {
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

  updateSorting($event: Sort) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          sortColumn: $event.active,
          sortDirection: $event.direction
        },
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }
}
