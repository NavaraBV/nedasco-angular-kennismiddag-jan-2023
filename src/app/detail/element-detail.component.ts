import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {ElementsDataSource} from '../table-with-pagination/elements-data.source';

@Component({
  selector: 'app-element-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class ElementDetailComponent {
  element$ = this.route.params.pipe(map(({id}) => this.dataSource.data.find(element => element.id === parseInt(id,10))));
  private dataSource: ElementsDataSource;

  constructor(private route: ActivatedRoute) {
    this.dataSource = new ElementsDataSource();
  }
}
