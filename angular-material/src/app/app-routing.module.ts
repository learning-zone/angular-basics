import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AutocompleteComponent } from '../app/components/pages/autocomplete/autocomplete.component';
import { CheckboxComponent } from '../app/components/pages/checkbox/checkbox.component';
import { DatepickerComponent } from '../app/components/pages/datepicker/datepicker.component';
import { FormComponent } from '../app/components/pages/form/form.component';
import { InputComponent } from '../app/components/pages/input/input.component';
import { RadioComponent } from '../app/components/pages/radio/radio.component';
import { SelectComponent } from '../app/components/pages/select/select.component';
import { SlideComponent } from '../app/components/pages/slide/slide.component';
import { SliderComponent } from '../app/components/pages/slider/slider.component';


const routes: Routes = [

  { path: '', redirectTo: '/', pathMatch: 'full', data: {title: 'Home | Angular Material'}},
  { path: 'home', redirectTo: '/', pathMatch: 'full', data: {title: 'Home | Angular Material'}},
  // { path: '**', component: PageNotFoundComponent, data: {title: 'Page Not Found | Angular Material'}}

  { path: 'autocomplete', component: AutocompleteComponent, data: {title: 'Autocomplete | Angular Material'}},
  { path: 'checkbox', component: CheckboxComponent, data: {title: 'Checkbox | Angular Material'}},
  { path: 'datepicker', component: DatepickerComponent, data: {title: 'Datepicker | Angular Material'}},
  { path: 'material-form', component: FormComponent, data: {title: 'Form | Angular Material'}},
  { path: 'input', component: InputComponent, data: {title: 'Input | Angular Material'}},
  { path: 'radio', component: RadioComponent, data: {title: 'Radio | Angular Material'}},
  { path: 'select', component: SelectComponent, data: {title: 'Select | Angular Material'}},
  { path: 'slide', component: SlideComponent, data: {title: 'Slide | Angular Material'}},
  { path: 'slider', component: SliderComponent, data: {title: 'Slider | Angular Material'}}

];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
