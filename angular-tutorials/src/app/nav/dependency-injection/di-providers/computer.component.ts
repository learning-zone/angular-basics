import { Component, OnInit } from '@angular/core';
import { DesktopService } from './service/desktop.service';

@Component({
  selector: 'app-computer',
  template: `
    <b> I work on {{ computerName }} </b>
  `
})
export class ComputerComponent implements OnInit {
  computerName: String;
  constructor(private computerService: DesktopService) {}

  ngOnInit() {
    this.computerName = this.computerService.getComputerName();
  }
}
