import { Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Employee } from "../app/Models/employee.model";

import { ILogin, IRegister } from "../app/Models/login.model";
 
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization':'Basic '+localStorage.getItem('currentUserToken')
  })
  
@Injectable()
export class EmployeeServiece {

  private serviceurl = 'http://localhost:63385/api/employee';

  private registerurl = 'http://localhost:63385/api/Register/Login';
  constructor(private _http: HttpClient) {


  }


  getEmployees(): Observable<Employee[]> {

     let header:HttpHeaders=new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization':'Basic '+localStorage.getItem('currentUserToken')
      });
    return this._http.get<Employee[]>(this.serviceurl, {headers:header});

  }

  getEmployee(id: number): Observable<Employee> {


    const url = `${this.serviceurl}/${id}`;
    return this._http.get<Employee>(url, {headers});

  }

  InsertEmployee(employee: Employee): Observable<Employee> {
    return this._http
      .post<Employee>(this.serviceurl, (employee), {headers})
      ;

  }

  UpdateEmployee(employee: Employee): Observable<Employee> {
    const url = `${this.serviceurl}/${employee.id}`;
    debugger;
    
    console.log(localStorage.getItem('currentUserToken'));
    return this._http.put<Employee>(url, (employee), {headers})
  }

  DeleteEmployee(employee: Employee): Observable<any> {
    
    console.log(localStorage.getItem('currentUserToken'));
    const url = `${this.serviceurl}/${employee.id}`;
    return this._http.delete(url, {headers});
  }

  getAllUsers() {
    
    console.log(localStorage.getItem('currentUserToken'));
    return this._http.get<ILogin[]>(this.registerurl, { observe: 'response' })

  }
  Login(UserName: string, password: string): Observable<ILogin> { 
headers.append('Authorization','Basic '+btoa(UserName+':'+password)); 
 
console.log(localStorage.getItem('currentUserToken'));
    return this._http
      .post<ILogin>(this.registerurl, JSON.stringify({ UserName, password }), {headers});


  }

  RegisterUser(Username: string, password: string): Observable<HttpResponse<ILogin>> {

    return this._http
      .post<ILogin>(this.registerurl, { Username, password }, { observe: 'response' });
       
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
  
}