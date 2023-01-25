import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ElementsDataSource } from '../element-list/elements-data.source';

@Component({
  selector: 'app-element-detail',
  templateUrl: './element-detail.component.html',
  styleUrls: ['./element-detail.component.scss'],
})
export class ElementDetailComponent {
  element$ = this.route.params.pipe(
    map(({ id }) =>
      this.dataSource.data.find(element => element.id === Number(id))
    )
  );
  private dataSource: ElementsDataSource;

  constructor(private route: ActivatedRoute) {
    this.dataSource = new ElementsDataSource();
  }
}
