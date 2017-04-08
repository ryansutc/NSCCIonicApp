/**
 * Created by inet2005 on 4/7/17.
 */

//Using a service for data access means you can switch data sources without messing with components
import { Injectable } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Building} from "./building";
//import { HEROES } from './mock-heroes'; //if you want a direct list of dummy data

@Injectable()
export class BuildingService {
  private buildingsUrl = 'http://nsccsucks.xyz/RoomsList/getJSON'; //we should declare the root domain as a global somewhere?
  constructor(private http: Http){}
  private headers = new Headers({'Content-Type': 'application/json'});

  getBuildings(): Promise<Building[]>{
    return this.http.get(this.buildingsUrl)
      .toPromise()
      .then(response => response.json().data as Building[])
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes
    return Promise.reject(error.message || error)
  }


  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }
}



