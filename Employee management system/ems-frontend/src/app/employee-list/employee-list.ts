import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.html'
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log("Employee List Loaded");
    this.getEmployees();
  }

  getEmployees() {
    setTimeout(() => {
      this.employeeService.getAllEmployees().subscribe({
        next: (data) => {
          console.log("Data after refresh:", data);
          this.employees = [...data];
        },
        error: (err) => {
          console.error(err);
        }
      });
    }, 300);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.getEmployees();
    });
  }

  editEmployee(id: number) {
    this.router.navigate(['/edit', id]);
  }

  viewEmployee(id: number) {
    this.router.navigate(['/view', id]);
  }

  addEmployee() {
    this.router.navigate(['/add']);
  }
}