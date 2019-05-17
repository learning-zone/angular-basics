import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-reative-forms',
  templateUrl: './reative-forms.component.html',
  styleUrls: ['./reative-forms.component.scss']
})
export class ReativeFormsComponent implements OnInit {
  userForm = this.userForm;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
     if (this.userForm.valid) {
       console.log('Form Saved Successfully !')
     } else {
       console.log('Some fields are missing !');
     } 
  }
}
