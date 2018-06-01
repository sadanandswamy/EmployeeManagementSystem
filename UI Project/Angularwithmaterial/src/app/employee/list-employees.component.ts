import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Employee } from '../Models/employee.model'
import { EmployeeServiece } from '../employee.service';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateEmployeeComponent } from '../CreateEmpolyee/create-employee.component';
import { catchError, retry, tap, map, retryWhen, delayWhen } from 'rxjs/operators';
@Component({

  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
  providers: [EmployeeServiece]
})

export class ListEmployeesComponent implements OnInit {
  createComponent: CreateEmployeeComponent;
  clscolor: string = 'alert-danger';
  DeleteEmployee(employee: Employee) {

    // this._activatedRoute.snapshot.params['id'];

    if (confirm("Are you sure to delete " + employee.id)) {
      debugger;

      this._employeeServiece.DeleteEmployee(employee).subscribe(response => {
        debugger;

        if (response.status == 404) {
          this.statusMessage = 'Employee does not found';


        } if (response.status == 200) {

          this.statusMessage = 'Deleted Successfully';
          this.clscolor = 'alert alert-success';
          this.router.navigate(['/list']);
        }
      });
      console.log("Implement delete functionality here");
    }
  }


  public loading = false;
  employees: Employee[];
  statusMessage: string = 'Loading data. Please wait...';
  retryCount: number = 0;
  constructor(private _employeeServiece: EmployeeServiece, private _activatedRoute: ActivatedRoute,
    private router: Router) {

  }
  // //
  // retryWhen( err=>err.pipe(

  //    tap(val => {
  //      debugger
  //      this. retryCount+=1;
  //      if (this.retryCount<3) {
  //        debugger;
  //        this.statusMessage = 'Retrying...Attempt #' + this.retryCount;
  //        return  this.retryCount;
  //    }
  //    else {
  //      debugger
  //        throw (this.retryCount);
  //    }
  //    }),
  //    //restart in 5 seconds
  //    delayWhen(val=> timer(this.retryCount * 1000))
  //  ))
  ngOnInit() {

    this._employeeServiece.getEmployees().subscribe(resp => {
      console.log(resp);
      debugger;
      this.loading = false;
      if (resp == null) {
        this.statusMessage ="No Data found";
      }
      else {
        debugger;
        this.employees = resp;
      }
  
  })
  }
  private handleError(error: HttpErrorResponse) {
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
    return throwError(
      'Something bad happened; please try again later.');
  };
}
