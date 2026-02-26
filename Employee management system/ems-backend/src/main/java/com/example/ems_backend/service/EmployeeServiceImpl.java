package com.example.ems_backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.ems_backend.model.Employee;
import com.example.ems_backend.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeServiceImpl(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public Employee addEmployee(Employee employee) {
        return repository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id " + id));
    }

    @Override
    public Employee updateEmployee(Long id, Employee emp) {
        Employee employee = getEmployeeById(id);
        employee.setName(emp.getName());
        employee.setEmail(emp.getEmail());
        employee.setSalary(emp.getSalary());
        return repository.save(employee);
    }

    @Override
    public void deleteEmployee(Long id) {
        repository.deleteById(id);
    }
}
