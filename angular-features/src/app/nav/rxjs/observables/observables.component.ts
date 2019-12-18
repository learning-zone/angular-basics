import { Component } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.scss']
})
export class ObservablesComponent {
  employees = new Array<Employee>();

  constructor(empService: EmployeeService) {
    empService.getEmployees().subscribe(response => {
      this.employees = response.map(item => {
        return new Employee(item.id, item.name, item.email);
      });
    });
  }
}

/**
 * Note:
 * npm install -g json-server
 * json-server --watch db.json 
 */
