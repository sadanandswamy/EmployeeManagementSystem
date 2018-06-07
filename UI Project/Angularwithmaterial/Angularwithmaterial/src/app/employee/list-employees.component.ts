import { Component, OnInit, Input, HostListener, ViewChild } from '@angular/core';
import { Employee } from '../Models/employee.model'
import { EmployeeServiece } from '../employee.service';
import { Observable, Subject, throwError, timer } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateEmployeeComponent } from '../CreateEmpolyee/create-employee.component';
import { catchError, retry, tap, map, retryWhen, delayWhen } from 'rxjs/operators';
import { MatTableDataSource, MatSort } from '@angular/material';
@Component({

  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css'],
  providers: [EmployeeServiece]
})

export class ListEmployeesComponent implements OnInit {
  createComponent: CreateEmployeeComponent;
  clscolor: string = 'alert-danger';
  displayedColumns = ['id', 'name', 'gender', 'email', 'phoneNumber', 'dateOfBirth',
    'departmentName', 'address', 'cityName', 'stateName', 'countryName', 'postalCode', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  private _searchText: string;
  get searchText(): string {
    return this._searchText;
  }

  set searchText(value: string) {
    this._searchText = value;
    this.filteredEmployees = this.filterEmplyeesMethod(value);
  }

  public loading = false;
  employees: Employee[];
  statusMessage: string = 'Loading data. Please wait...';
  retryCount: number = 0;
  filteredEmployees: Employee[];
  dataSource: any;
  constructor(private _employeeServiece: EmployeeServiece, private _activatedRoute: ActivatedRoute,
    private router: Router) {
    this.employees = this._activatedRoute.snapshot.data['employeeList'];
  }
  DeleteEmployee(employee: Employee) {

    // this._activatedRoute.snapshot.params['id'];

    if (confirm("Are you sure to delete " + employee.id)) {
      debugger;

      this._employeeServiece.DeleteEmployee(employee).pipe(
        // catchError(this.handleError)
      ).subscribe(response => {
        debugger;
        if (response !== "Deleted") {
          this.statusMessage = 'Employee does not found';


        } if (response === "Deleted") {

          this.statusMessage = 'Deleted Successfully';
          this.clscolor = 'alert alert-success';
          this.getAllEmployees();
        }

      }, err => {
        debugger
        if (err.status == 404) {
          this.statusMessage = 'Employee does not found';


        } if (err.status == 200) {

          this.statusMessage = 'Deleted Successfully';
          this.clscolor = 'alert alert-success';
          this.getAllEmployees();
        }
      });
      console.log("Implement delete functionality here");
    }
  }
  filterEmplyeesMethod(searchString: string) {
    return this.employees.filter(item => item.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
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
    this.getAllEmployees();
    this.filteredEmployees = this.employees;
    this.dataSource = new MatTableDataSource(this.filteredEmployees);
    this.dataSource.sort = this.sort;
  }
  getAllEmployees() {
    debugger
    if (localStorage.getItem('currentUser') != null) {
      this._employeeServiece.getEmployees().pipe(
        catchError(this.handleError)
      ).subscribe(resp => {
        console.log(resp);
        debugger;
        this.loading = false;
        if (resp == null) {
          this.statusMessage = "No Data found";
        }
        else {
          this.employees = resp;
        }

      }, err => {
        debugger
        if (err.status == 0) {
          this.statusMessage = "Service Unavailable";
        }
        if (err.status == 400) {
          this.statusMessage = "Bad Request." + err.statusText
        }
        if (err.status == 401) {
          this.statusMessage = "Un-Authorized .Make Sure you are a registed user !."
        }
      })
    } else {
      this.statusMessage = "Please Login First ";
      return;
    }
  }
  onEmployeeClick(id: number) {
    this.router.navigate(['/employees', id]);
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
