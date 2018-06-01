import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Department } from "../Models/department.model"
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../Models/employee.model';
import { WorldDataService } from '../worldData.service';
import { Observable } from 'rxjs';
import { EmployeeServiece } from '../employee.service';
import { Cities } from '../Models/cities.model';
import { Country } from '../Models/country.model';
import { States } from '../Models/States.model';
import { ActivatedRoute,Router } from '@angular/router';
@Component({

  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],

})
export class CreateEmployeeComponent implements OnInit {
  previewPhoto: boolean = false;

  bsDatepickerConfig: Partial<BsDatepickerConfig>;
  cities: Cities[];
  countries: Country[];
  states: States[];
  statusMessage: string;
  employee: Employee = {
    id: null,
    name: null,
    gender: null,
    email: null,
    phoneNumber: null,

    dateOfBirth: null,
    departmentId: null,
    departmentName: null,
    address: null,
    cityId: null,
    stateId: null,
    countryId: null,
    cityName: null,
    stateName: null,
    countryName: null,
    postalCode: '',
  }
  public bflag: boolean = true;
  clscolor: string;
  deparmentChange(event) {
    debugger;
    this.departments.forEach(element => {
      debugger
      if (element.deptId == event) {

        this.employee.departmentName = element.deptName;
      }
    });

  }
  departments: Department[] = [

    {
      deptId: 1, deptName: 'IT'

    },
    {
      deptId: 2, deptName: 'PayRoll'

    },
    {
      deptId: 3, deptName: 'Finance'

    },
    {
      deptId: 4, deptName: 'HR'

    },
    {
      deptId: 5, deptName: 'Accounting'

    },
  ];
  constructor(private _worldDataService: WorldDataService, private _activatedRoute: ActivatedRoute,
    private _empservice: EmployeeServiece,private _router:Router
  ) {


    this.bsDatepickerConfig = Object.assign(
      {},
      {
        containerClass: 'theme-dark-blue',

        dateInputFormat: 'DD/MM/YYYY'
      })

  }

  onStateChange(event) {


    this._worldDataService.getCities().subscribe(item => {

      debugger
      this.cities = ((item['cities'])).filter(x => x.state_id === event);

    })
    this.states.forEach(element => {
      debugger;
      if (element.id == event) {
        debugger;

        this.employee.stateName = element.name;
      }
    });

    console.log(this.employee.stateName);

  }
  onCityChange(event) {

    this.cities.forEach(element => {
      debugger;
      if (element.id === event) {
        debugger
        this.employee.cityId = element.id.toString();
        this.employee.cityName = element.name;
      }
    });
    console.log(this.employee.cityName);
  }

  onCountryChange(event: any) {
    this.cities = [];

    this._worldDataService.getStates().subscribe(item => {

      debugger
      this.states = ((item['states'])).filter(x => x.country_id === event);

    });
    this.countries.forEach(element => {

      if (element.id == event) {
        debugger;
        this.employee.countryName = element.name;
      }
    });
    console.log(this.employee.countryName);


  }
  ngOnInit() {
    // this._worldDataService.getCities().subscribe(x => {

    //   this.cities = <Cities[]>(x['cities']);
    // });

    this._worldDataService.getStates().subscribe(item => {

      debugger
      this.states = ((item['states']));

    });
    this._worldDataService.getCities().subscribe(item => {

      debugger
      this.cities = ((item['cities']));

    })
    this._worldDataService.getCountries().subscribe(x => {
      debugger;
      this.countries = <Country[]>(x['countries']);
    });


    let empid = this._activatedRoute.snapshot.params['id'];

    if (empid != undefined) {
      this._empservice.getEmployee(empid).subscribe(response => {
        debugger;
        this.bflag = false;
        if (response != null) {
          this.employee = response;
          this.employee.countryId = response.countryId.toString();
          this.employee.stateId = response.stateId.toString();
          this.employee.cityId = response.cityId.toString();

        } else {
          this.statusMessage = 'Employee Not Found with specified Id';
          this.clscolor = 'alert-danger';
        }

      })
    }
  }




  saveEmployee(newemployee: Employee) {
    if (this.bflag) {
      debugger;
      this._empservice.InsertEmployee(newemployee).subscribe(data => {
        debugger;
        if (data != null) {
          this.statusMessage = "SuccessFully Inserted";
          this.clscolor = 'alert-success';
          this.employee = new Employee();
        } else {
          this.statusMessage = "Something went wrong";
          this.clscolor = 'alert-danger';
        }

      })
    } else {
      debugger;
      this._empservice.UpdateEmployee(newemployee).subscribe(data => {
        debugger;
        if (data != null) {
          this.statusMessage = "SuccessFully Updated";
          this.clscolor = 'alert-success';
          this.employee = null;
          this._router.navigate(['/list'])

        } else {
          this.statusMessage = "Something went wrong";
          this.clscolor = 'alert-danger';
        }
      })
    }


  }
}
