import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reative-forms',
  templateUrl: './reative-forms.component.html',
  styleUrls: ['./reative-forms.component.scss']
})
export class ReativeFormsComponent implements OnInit {
  userForm: any = FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get formValues() {
    return this.userForm.controls;
  }
  onSubmit() {
    this.submitted = true;
     if (this.userForm.invalid) {
       return;
     }

     alert('SUCCESS !!! \n\n' + JSON.stringify(this.userForm.value));
  }
}
