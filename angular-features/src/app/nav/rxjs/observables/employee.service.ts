import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  public getEmployees(): Observable<Employee[]> {
    const url = 'http://localhost:3000/employees';

    return this.httpClient.get<Employee[]>(url);
  }
}
