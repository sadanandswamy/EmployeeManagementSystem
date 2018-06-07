import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EmployeeServiece} from '../employee.service';
import { Employee } from '../Models/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
employee:Employee
  constructor(private _activatedRoute:ActivatedRoute,private _empService:EmployeeServiece) { }

  ngOnInit() {
   const id= +this._activatedRoute.snapshot.paramMap.get('id');
  this._empService.getEmployee(id).subscribe(resp=>{
    this.employee=resp;
  });
  }

}
