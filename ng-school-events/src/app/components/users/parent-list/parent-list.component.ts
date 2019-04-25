import { Component, OnInit } from '@angular/core';
import { ParentsService } from "../../../services/parents.service";
import { ConfigurationService } from "../../../services/configuration.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-parent-list",
  templateUrl: "./parent-list.component.html",
  styleUrls: ["./parent-list.component.css"]
})
export class ParentListComponent implements OnInit {
  
  parentUsers: any[];
  pages = 10;
  rangePages = [];
  currentPage = 1;
  constructor(private route: ActivatedRoute, private parentsSvc: ParentsService, private confSvc: ConfigurationService) {
    this.parentUsers = [];
  }
  
  ngOnInit() {
    this.parentsSvc.getParentsCount().subscribe(countInfo => {
      this.pages = Math.round(countInfo.count / this.confSvc.pageSize);
      const range = (from, to, step) =>
        Array(Math.floor((to - from) / step) + 1)
          .fill(0)
          .map((v, i) => from + i * step);
      this.rangePages = range(1, this.pages, 1);
    });

    if (this.route.snapshot.queryParams["page"]) {
      this.currentPage = Number(this.route.snapshot.queryParams["page"]);
    }
    this.parentsSvc
      .getParents(
        this.confSvc.pageSize,
        (this.currentPage - 1) * this.confSvc.pageSize
      )
      .subscribe(parents => {
        this.parentUsers = parents;
      });
    
  }
}
