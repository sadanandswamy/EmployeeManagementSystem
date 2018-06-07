import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {

  constructor( private _router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')){

    }else{
      alert("Not Authirized .To view Data please login ");
      this._router.navigate(['/login']);
    }
  }

}
