import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AutocompleteComponent } from '../app/components/pages/autocomplete/autocomplete.component';
import { CheckboxComponent } from '../app/components/pages/checkbox/checkbox.component';
import { DatepickerComponent } from '../app/components/pages/datepicker/datepicker.component';
import { FormComponent } from '../app/components/pages/form/form.component';


const routes: Routes = [

  { path: '', redirectTo: '/', pathMatch: 'full', data: {title: 'Home | Angular Material'}},
  { path: 'home', redirectTo: '/', pathMatch: 'full', data: {title: 'Home | Angular Material'}},
  // { path: '**', component: PageNotFoundComponent, data: {title: 'Page Not Found | Angular Material'}}

  { path: 'autocomplete', component: AutocompleteComponent, data: {title: 'Autocomplete | Angular Material'}},
  { path: 'checkbox', component: CheckboxComponent, data: {title: 'Checkbox | Angular Material'}},
  { path: 'datepicker', component: DatepickerComponent, data: {title: 'Datepicker | Angular Material'}},
  { path: 'material-form', component: FormComponent, data: {title: 'Form | Angular Material'}}

];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
