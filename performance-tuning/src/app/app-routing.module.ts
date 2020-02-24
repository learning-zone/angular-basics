import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
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

import { DragDropComponent } from '../app/cdk/pages/drag-drop/drag-drop.component';
import { PlatformComponent } from '../app/cdk/pages/platform/platform.component';
import { PortalComponent } from '../app/cdk/pages/portal/portal.component';
import { ScrollingComponent } from '../app/cdk/pages/scrolling/scrolling.component';
import { TextFieldComponent } from '../app/cdk/pages/text-field/text-field.component';


const routes: Routes = [

  { path: '', redirectTo: 'components/home', pathMatch: 'full', data: {title: 'Home | Angular Material'}},

  { path: 'components/home', component: HomeComponent, data: {title: 'Home | Angular Material'}},
  { path: 'components/autocomplete', component: AutocompleteComponent, data: {title: 'Autocomplete | Angular Material'}},
  { path: 'components/checkbox', component: CheckboxComponent, data: {title: 'Checkbox | Angular Material'}},
  { path: 'components/datepicker', component: DatepickerComponent, data: {title: 'Datepicker | Angular Material'}},
  { path: 'components/material-form', component: FormComponent, data: {title: 'Form | Angular Material'}},
  { path: 'components/paginator', component: PaginatorComponent, data: {title: 'Paginator | Angular Material'}},
  { path: 'components/sort-header', component: SortHeaderComponent, data: {title: 'SortHeader | Angular Material'}},
  { path: 'components/card', component: CardComponent, data: {title: 'Card | Angular Material'}},
  { path: 'components/tabs', component: TabsComponent, data: {title: 'Tabs | Angular Material'}},
  { path: 'components/list', component: ListComponent, data: {title: 'List | Angular Material'}},
  { path: 'components/button', component: ButtonComponent, data: {title: 'Button | Angular Material'}},
  { path: 'components/badge', component: BadgeComponent, data: {title: 'Badge | Angular Material'}},
  { path: 'components/chips', component: ChipsComponent, data: {title: 'Chips | Angular Material'}},
  { path: 'components/progress-spinner', component: ProgressSpinnerComponent, data: {title: 'ProgressSpinner | Angular Material'}},
  { path: 'components/progress-bar', component: ProgressBarComponent, data: {title: 'ProgressBar | Angular Material'}},
  { path: 'components/bottom-sheet', component: BottomSheetComponent, data: {title: 'BottomSheet | Angular Material'}},
  { path: 'components/dialog', component: DialogComponent, data: {title: 'Dialog | Angular Material'}},
  { path: 'components/snackbar', component: SnackbarComponent, data: {title: 'Snackbar | Angular Material'}},
  { path: 'components/tooltip', component: TooltipComponent, data: {title: 'Tooltip | Angular Material'}},

  { path: 'cdk/drag-drop', component: DragDropComponent, data: {title: 'DragDrop | Angular Material'}},
  { path: 'cdk/platform', component: PlatformComponent, data: {title: 'Platform | Angular Material'}},
  { path: 'cdk/portal', component: PortalComponent, data: {title: 'Portal | Angular Material'}},
  { path: 'cdk/scrolling', component: ScrollingComponent, data: {title: 'Scrolling | Angular Material'}},
  { path: 'cdk/text-field', component: TextFieldComponent, data: {title: 'TextField | Angular Material'}},

  // { path: '**', component: PageNotFoundComponent, data: {title: 'Page Not Found | Angular Material'}}

];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
