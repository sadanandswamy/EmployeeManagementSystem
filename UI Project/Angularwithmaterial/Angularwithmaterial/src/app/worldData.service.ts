import {Injectable} from '@angular/core';
import{ HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cities} from './Models/cities.model';
import {Country} from './Models/country.model';
import {States} from './Models/States.model';
 
import { catchError, map, tap } from 'rxjs/operators';
@Injectable()
export class WorldDataService{
private _citiesurl='assets/CountriesDatabase/cities.json';


constructor( private _http:HttpClient)
{

}
getCities(){
    let headers = new Headers();
    headers.append("Content-Type", "application/json; chartset=utf-8");
    return this._http.get(this._citiesurl)
     
    
}

private _countriesUrl='assets/CountriesDatabase/countries.json';
getCountries(){
    return this._http.get(this._countriesUrl);
}

private _statesUrl='assets/CountriesDatabase/states.json';
getStates(){
    return this._http.get(this._statesUrl)
    
}


}