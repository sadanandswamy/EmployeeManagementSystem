import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ILogin } from '../Models/login.model';
import { EmployeeServiece } from '../employee.service';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';
@Component({
    selector: 'main-menu',
    templateUrl: './mainMenu.component.html',
    styleUrls: ['./maimMenu.component.css'],
    animations: [
        trigger('collapse', [
          state('open', style({
            opacity: '1',
            display: 'block',
            transform: 'translate3d(0, 0, 0)'
          })),
          state('closed',   style({
            opacity: '0',
            display: 'none',
            transform: 'translate3d(0, -100%, 0)'
          })),
          transition('closed => open', animate('200ms ease-in')),
          transition('open => closed', animate('100ms ease-out'))
        ])
      ]
})
export class MainMenuComponent implements OnInit {
    currentUser: string;
    blogtext: boolean = false;
    LoginText: string = 'Login';
    collapse: string = "closed";
    constructor(private employeeService: EmployeeServiece,
        private _router: Router, private _activatedRoute: ActivatedRoute) {
       
        this.getCurrentUser();
    }
    ngOnInit() {

    }
    getCurrentUser() {
        this.currentUser = (localStorage.length > 0 && localStorage != null) ? localStorage.getItem('currentUser') : "";
        this.LoginText = localStorage.getItem('LoginText') ? localStorage.getItem('LoginText') : this.LoginText;

    }
    toggleCollapse() {
        // this.show = !this.show
        this.collapse = this.collapse == "open" ? 'closed' : 'open';
    }
    Logout() {
        this.LoginText = 'Login';
        this.currentUser = '';
        localStorage.clear();
    }
    onLoginClick(LoginText) {
        debugger;
        if (LoginText === "Logout") {
            this.LoginText = "Login";
            this.Logout();
            this._router.navigate(['/login']);
        }
        if (LoginText == "Login") {
            this._router.navigate(['/login']);
        }
    }
}
