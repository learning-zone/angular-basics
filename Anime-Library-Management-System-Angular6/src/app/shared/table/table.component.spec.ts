import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TableComponent } from './table.component';

import { NgReduxModule } from '@angular-redux/store';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [ NgReduxModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should have a table to display the animes', () => {
    //expect(element.innerHTML).toContain("thead");
    //expect(element.innerHTML).toContain("tbody");
  })

  it('should have table 2nd column header as `Name`', () => {
    const secondColumnHeader = fixture.nativeElement.querySelector('table th:nth-child(2)');
    expect(secondColumnHeader.textContent).toEqual('Name');
  });

  it('should have table 3rd column header as `Episodes`', () => {
    const thirdColumnHeader = fixture.nativeElement.querySelector('table th:nth-child(3)');
    expect(thirdColumnHeader.textContent).toEqual('Episodes');
  });

  it('should have table 4th column header as `Genre`', () => {
    const fourthColumnHeader = fixture.nativeElement.querySelector('table th:nth-child(4)');
    expect(fourthColumnHeader.textContent).toEqual('Genre');
  });

  it('should have table 5th column header as `Rating`', () => {
    const fifthColumnHeader = fixture.nativeElement.querySelector('table th:nth-child(5)');
    expect(fifthColumnHeader.textContent).toEqual('Rating');
  });

  it('should have table 6th column header as `Popularity`', () => {
    const sixthColumnHeader = fixture.nativeElement.querySelector('table th:nth-child(6)');
    expect(sixthColumnHeader.textContent).toEqual('Popularity');
  });

});
