//service file names are written as name.service.ts or super-name.service.ts (always lowercase)
//Using a service for data access means you can switch data sources without messing with components
import { Injectable } from '@angular/core';
import {Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

//This should get data from NSCCSucksURL

@Injectable()
export class FreeRoomService {
  private freeroomUrl = 'http://nsccsucks.xyz/FreeRoom/roomData/INSTI/ITC'; //free rooms now
  constructor(private http: Http){}
  private headers = new Headers({'Content-Type': 'application/json'});

  //Get a simple string list of free rooms from nsccsucks.xyz website
  getFreeRooms(campus: string, building: string): Promise<String[]>{
    return this.http.get(this.freeroomUrl)
      .toPromise()
      .then(response => response.json().data as String[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes
    return Promise.reject(error.message || error)
  }

}



