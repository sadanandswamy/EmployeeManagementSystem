import { Component, OnInit } from '@angular/core';
import  {ILogin} from '../Models/login.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../auth-service.service';
import{AlertService} from '../alert-service.service';
import {EmployeeServiece} from '../employee.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  ,providers:[AlertService]
})
export class LoginComponent implements OnInit {

  loginModel:ILogin={
  userName:null,
  password:null,
  user_token:null
  };
 
  loading = false;
  returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeServiece: EmployeeServiece,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.employeeServiece.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login(loginModel:ILogin) {
    this.loading = true;
    debugger
    this.employeeServiece.Login(this.loginModel.userName,this.loginModel.password)
        .subscribe(
            data => {
              debugger;
              localStorage.setItem('currentUser',(data.userName)); 
              localStorage.setItem('currentUserToken',(data.user_token));
              localStorage.setItem('LoginText',"Logout");
            
                this.router.navigate(['']);
            },
            error => {
              localStorage.setItem('LoginText',"Login")
                this.alertService.error(error);
                this.loading = false;
            });
}
}
