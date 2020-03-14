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

   public albumdetails = [];
   constructor(private scrollingService: ScrollingService) {}
   ngOnInit() {
      this.scrollingService.getData().subscribe((data) => {
         this.albumdetails = Array.from(Object.keys(data), k => data[k]);

         // Hide Progress Indicator once data fetched
         if (this.albumdetails.length > 0) {
            document.getElementById('progress-indicator').setAttribute('style', 'display: none');
         }
      });
   }

}
