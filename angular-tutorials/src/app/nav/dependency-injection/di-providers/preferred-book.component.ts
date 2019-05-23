import { Component, OnInit } from '@angular/core';
import { PreferredBookService } from './service/preferred-book.service';

@Component({
  selector: 'app-preferred-book',
  template: `
    <b>preferred Books </b> {{preferredBooks}}
  `
})
export class PreferredBookComponent implements OnInit {

  preferredBooks: string;
  constructor(private preferredBookService: PreferredBookService) { }

  ngOnInit() {
    this.preferredBooks = this.preferredBookService.getPreferredBooks();
  }

}
