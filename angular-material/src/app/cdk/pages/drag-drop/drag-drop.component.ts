import { Component } from '@angular/core';

@Component({
  selector: 'app-drag-drop',
  template: `
  <h3>Drag & Drop<hr/></h3>
    <mat-tab-group>
      <mat-tab label="Basic Drag & Drop"> <app-basic-drag-drop></app-basic-drag-drop> </mat-tab>
      <mat-tab label="Sorting"> <app-sorting></app-sorting> </mat-tab>
      <mat-tab label="Connected Sorting"> <app-connected-sorting></app-connected-sorting> </mat-tab>
      <mat-tab label="With a handle"> <app-with-a-handle></app-with-a-handle> </mat-tab>
      <mat-tab label="Custom Preview"> <app-custom-preview></app-custom-preview> </mat-tab>
      <mat-tab label="Custom Placeholer"> <app-custom-placeholer></app-custom-placeholer> </mat-tab>
      <mat-tab label="Horizontal Sorting"> <app-horizontal-sorting></app-horizontal-sorting> </mat-tab>
      <mat-tab label="Boundary"> <app-boundary></app-boundary> </mat-tab>
      <mat-tab label="Position Locking"> <app-position-locking></app-position-locking> </mat-tab>
      <mat-tab label="With alternate root element"> <app-with-alternate-root-element></app-with-alternate-root-element> </mat-tab>
      <mat-tab label="Enter Predicate"> <app-enter-predicate></app-enter-predicate> </mat-tab>
    </mat-tab-group>
  `
})
export class DragDropComponent { }

