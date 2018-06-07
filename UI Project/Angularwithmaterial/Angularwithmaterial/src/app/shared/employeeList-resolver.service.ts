import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Employee } from "../Models/employee.model";
import { EmployeeServiece } from "../employee.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable()
export class EmployeeListResolverService implements Resolve<Employee[]>{
    constructor(private _employeeService: EmployeeServiece) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[]> {
        return this._employeeService.getEmployees();
    }


}