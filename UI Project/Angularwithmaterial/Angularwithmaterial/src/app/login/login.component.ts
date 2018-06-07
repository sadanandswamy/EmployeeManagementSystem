import { Component, OnInit } from '@angular/core';
import  {ILogin} from '../Models/login.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {Observable,throwError} from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {AuthenticationService} from '../auth-service.service';
import{AlertService} from '../alert-service.service';
import {EmployeeServiece} from '../employee.service';
import { catchError, retry, tap, map, retryWhen, delayWhen } from 'rxjs/operators';
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
  statusMessage:string='';
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
        .pipe(catchError(this.handleError)).subscribe(
            data => {
              debugger;
              localStorage.setItem('currentUser',(data.userName)); 
              localStorage.setItem('currentUserToken',(data.user_token));
              localStorage.setItem('LoginText',"Logout");
              this.router.navigate(['/list']);
            if(localStorage.getItem('currentUser')!==null){
               
              this.router.navigate([this.returnUrl]);
            }},
              err => {
              debugger
              this.loading = false;
               localStorage.setItem('LoginText',"Login")
               if (err.status == 0) {
               
                this.statusMessage = "Service Unavailable." + err.statusText
              }
              if (err.status == 400) {
                this.statusMessage = "Bad Request." + err.statusText
              }
              if (err.status == 401) {
                this.statusMessage = "Un-Authorized .Make Sure you are a registed user !."
              }
              })
}

private handleError(error: HttpErrorResponse) {
  
      debugger;
      if (error.error instanceof ErrorEvent) {
        debugger;
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        debugger;
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
  
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(error)
        ;
    };
}

