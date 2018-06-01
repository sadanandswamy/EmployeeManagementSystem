import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ILogin } from '../Models/login.model';
import { EmployeeServiece } from '../employee.service';
@Component({
    selector: 'main-menu',
    templateUrl: './mainMenu.component.html',
    styleUrls: ['./maimMenu.component.css']
})
export class MainMenuComponent implements OnInit {
    currentUser: string;
    blogtext:boolean=false;
    LoginText: string = 'Login';
    constructor(private employeeService: EmployeeServiece,
        private _router: Router, private _activatedRoute: ActivatedRoute) {
        debugger;

        this.currentUser = (localStorage.length > 0 && localStorage != null) ? localStorage.getItem('currentUser') : "";
        this.LoginText =   localStorage.getItem('LoginText')? localStorage.getItem('LoginText'): this.LoginText;
        
    }
    ngOnInit() {

    }
    Logout() {
        this.LoginText='Login';
        this.currentUser='';
       localStorage.clear();
    }
    onLoginClick(LoginText) {
        debugger;
        if  (LoginText==="Logout"){
           this.LoginText="Login";
            this.Logout();
            this._router.navigate(['/login']);
        }
        if(LoginText=="Login"){
            this._router.navigate(['/login']);
        }  
    }
}
