import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-form.html'
})
export class EmployeeForm implements OnInit {

  employee: Employee = {
    name: '',
    email: '',
    department: '',
    salary: 0
  };

  id?: number;

  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.service.getEmployeeById(this.id).subscribe(data => {
        this.employee = data;
      });
    }
  }

  save() {
    if (this.id) {
      this.service.updateEmployee(this.id, this.employee)
        .subscribe(() => this.router.navigate(['/']));
    } else {
      this.service.createEmployee(this.employee)
        .subscribe(() => this.router.navigate(['/']));
    }
  }
}