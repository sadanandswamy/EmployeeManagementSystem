import {CanDeactivate} from '@angular/router';
 import {Injectable} from '@angular/core';
import {CreateEmployeeComponent} from './create-employee.component';
@Injectable()
export class CreateEmployeeCanDeactivateGuardService implements CanDeactivate<CreateEmployeeComponent>{
    canDeactivate(component: CreateEmployeeComponent): boolean{
        if(component.createEmployeeForm.dirty){
            return confirm("Are you sure u want to discard changes ");
        }else{
           return true;
       
        }
    }
}