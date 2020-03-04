import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  isSubmitted = false;

  // City Names
  City: any = ['Bengaluru', 'Florida', 'Delhi', 'Tennessee', 'Michigan'];

  constructor(public fb: FormBuilder) { }

  // Form Validation
  registrationForm = this.fb.group({
    cityName: ['', [Validators.required]]
  });

  // Choose city using select dropdown
  changeCity(e: any) {
    console.log(e.value);
    this.cityName.setValue(e.target.value, {
      onlySelf: true
    });
  }

  // Getter method to access formcontrols
  get cityName() {
    return this.registrationForm.get('cityName');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.registrationForm.valid) {
      return false;
    } else {
      document.getElementById('result').innerHTML = '<pre>' + JSON.stringify(this.registrationForm.value) + '</pre>';
    }
  }
}
