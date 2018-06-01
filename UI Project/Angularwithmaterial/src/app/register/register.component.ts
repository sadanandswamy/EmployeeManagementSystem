import { Component, OnInit } from '@angular/core';
import { IRegister, ILogin } from '../Models/login.model';
import { EmployeeServiece } from '../employee.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
 
})
export class RegisterComponent implements OnInit {

  registerModel: IRegister = {
    userName: null,
    password: null,
    confirmPassword: null
  }
bDisplay:boolean=false;
  constructor(private _employeeService: EmployeeServiece) { }

  ngOnInit() {

  }
  RegisterUser(registerModel:IRegister) {
    debugger;  
    this._employeeService.RegisterUser(registerModel.userName, registerModel.password).subscribe(data => {
      debugger
      if(data.status==201){
        this.bDisplay=true;
        this.registerModel={userName:null,password:null,confirmPassword:null};
      }
      console.log(data);

    });
  }
}
