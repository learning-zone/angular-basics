import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FactService } from './_service/fact.service';


@Component({
  selector: 'app-scrolling',
  templateUrl: './scrolling.component.html',
  styleUrls: ['./scrolling.component.scss']
})
export class ScrollingComponent {

  constructor(private http: HttpClient,
    private factService: FactService) {
  }

}
