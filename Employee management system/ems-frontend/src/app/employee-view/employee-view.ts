import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';   // ✅ ADD THIS
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [CommonModule, RouterModule],   // ✅ ADD HERE
  templateUrl: './employee-view.html'
})
export class EmployeeViewComponent implements OnInit {

  employee?: Employee;

  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getEmployeeById(id).subscribe(data => {
      this.employee = data;
    });
  }
}