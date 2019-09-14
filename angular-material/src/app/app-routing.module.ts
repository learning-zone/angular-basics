import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AutocompleteComponent } from '../app/components/pages/autocomplete/autocomplete.component';
import { CheckboxComponent } from '../app/components/pages/checkbox/checkbox.component';
import { DatepickerComponent } from '../app/components/pages/datepicker/datepicker.component';
import { FormComponent } from '../app/components/pages/form/form.component';
import { PaginatorComponent } from '../app/components/pages/paginator/paginator.component';
import { SortHeaderComponent } from '../app/components/pages/sort-header/sort-header.component';
import { CardComponent } from '../app/components/pages/card/card.component';
import { TabsComponent } from '../app/components/pages/tabs/tabs.component';
import { ListComponent } from '../app/components/pages/list/list.component';
import { ButtonComponent } from '../app/components/pages/button/button.component';
import { BadgeComponent } from '../app/components/pages/badge/badge.component';
import { ChipsComponent } from '../app/components/pages/chips/chips.component';
import { ProgressSpinnerComponent } from '../app/components/pages/progress-spinner/progress-spinner.component';
import { ProgressBarComponent } from '../app/components/pages/progress-bar/progress-bar.component';
import { BottomSheetComponent } from '../app/components/pages/bottom-sheet/bottom-sheet.component';
import { DialogComponent } from '../app/components/pages/dialog/dialog.component';
import { SnackbarComponent } from '../app/components/pages/snackbar/snackbar.component';
import { TooltipComponent } from '../app/components/pages/tooltip/tooltip.component';


const routes: Routes = [

  { path: '', redirectTo: '/', pathMatch: 'full', data: {title: 'Home | Angular Material'}},
  { path: 'home', redirectTo: '/', pathMatch: 'full', data: {title: 'Home | Angular Material'}},
  // { path: '**', component: PageNotFoundComponent, data: {title: 'Page Not Found | Angular Material'}}

  { path: 'autocomplete', component: AutocompleteComponent, data: {title: 'Autocomplete | Angular Material'}},
  { path: 'checkbox', component: CheckboxComponent, data: {title: 'Checkbox | Angular Material'}},
  { path: 'datepicker', component: DatepickerComponent, data: {title: 'Datepicker | Angular Material'}},
  { path: 'material-form', component: FormComponent, data: {title: 'Form | Angular Material'}},
  { path: 'paginator', component: PaginatorComponent, data: {title: 'Paginator | Angular Material'}},
  { path: 'sort-header', component: SortHeaderComponent, data: {title: 'SortHeader | Angular Material'}},
  { path: 'card', component: CardComponent, data: {title: 'Card | Angular Material'}},
  { path: 'tabs', component: TabsComponent, data: {title: 'Tabs | Angular Material'}},
  { path: 'list', component: ListComponent, data: {title: 'List | Angular Material'}},

  { path: 'button', component: ButtonComponent, data: {title: 'Button | Angular Material'}},
  { path: 'badge', component: BadgeComponent, data: {title: 'Badge | Angular Material'}},
  { path: 'chips', component: ChipsComponent, data: {title: 'Chips | Angular Material'}},
  { path: 'progress-spinner', component: ProgressSpinnerComponent, data: {title: 'ProgressSpinner | Angular Material'}},
  { path: 'progress-bar', component: ProgressBarComponent, data: {title: 'ProgressBar | Angular Material'}},

  { path: 'bottom-sheet', component: BottomSheetComponent, data: {title: 'BottomSheet | Angular Material'}},
  { path: 'dialog', component: DialogComponent, data: {title: 'Dialog | Angular Material'}},
  { path: 'snackbar', component: SnackbarComponent, data: {title: 'Snackbar | Angular Material'}},
  { path: 'tooltip', component: TooltipComponent, data: {title: 'Tooltip | Angular Material'}},


];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
