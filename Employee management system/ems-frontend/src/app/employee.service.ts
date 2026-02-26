import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private baseURL = 'http://localhost:8080/api/employees';

    constructor(private http: HttpClient) { }

    getAllEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.baseURL);
    }

    getEmployeeById(id: number): Observable<Employee> {
        return this.http.get<Employee>(`${this.baseURL}/${id}`);
    }

    createEmployee(emp: Employee): Observable<Employee> {
        return this.http.post<Employee>(this.baseURL, emp);
    }

    updateEmployee(id: number, emp: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.baseURL}/${id}`, emp);
    }

    deleteEmployee(id: number): Observable<any> {
        return this.http.delete(`${this.baseURL}/${id}`);
    }
}