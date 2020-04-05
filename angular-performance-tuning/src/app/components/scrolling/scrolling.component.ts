import { Component, OnInit } from '@angular/core';
import { ScrollingService } from './scrolling.service';

/**
 * Virtual Scrolling using RestAPI Call
 */
@Component({
  selector: 'app-scrolling',
  templateUrl: './scrolling.component.html',
  styleUrls: ['./scrolling.component.scss']
})
export class ScrollingComponent implements OnInit {
   isLoadingResults = false;
   public albumdetails = [];
   constructor(private scrollingService: ScrollingService) {}
   ngOnInit() {
      this.scrollingService.getData().subscribe((data) => {
         this.albumdetails = Array.from(Object.keys(data), k => data[k]);

         // Progress Indicator
         this.isLoadingResults = (this.albumdetails.length > 0) ? true : false;
      });
   }

}
