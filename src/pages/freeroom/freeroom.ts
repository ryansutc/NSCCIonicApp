import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import {FreeRoomService} from "../../app/freeroom.service";
import 'rxjs/add/operator/map'; //reactive extensions library and Observables
import {MomentModule} from 'angular2-moment/module';
import * as moment from 'moment';
import {Building} from "../../app/building";

@Component({
  selector: 'page-freeroom',
  templateUrl: 'freeroom.html',
  //providers: [FreeRoomService] // Component requires FreeRoomService for data to put into page (dependency injection)
})
export class FreeRoomPage implements OnInit {
  public buildings: Building[] = new Array<Building>();
  public campuses;
  public optionBuildings: Building[] = new Array<Building>();
  now: string;
  selCampus: string = "INSTI";
  selBuilding: string = "ITC";

  constructor(public navCtrl: NavController, public http: Http) { }

  ngOnInit(): void {

    this.now = this.getNow().toString();
    //Get returns results in form of an observable, map converts to JSON, subscribe allows access/iteration
    this.http.get('http://nsccsucks.xyz/RoomsList/getJSON').map(res => res.json()).subscribe(data => {
        let buildingList: Building[];
        for (let building of data) {
          let buildingObj: Building = new Building();
          buildingObj.campusId = building.campus;
          buildingObj.campusName = building.campusName;
          buildingObj.buildingId = building.building;
          buildingObj.buildingName = building.buildingName;
          this.buildings.push(buildingObj);
        }
        this.campuses = this.getUniqueListOfCampuses();
      },
      err => {
        console.log("Oops!");
      });
  }
  //Get list of relevant Buildings by a CampusName
  getBuildingsByCampus(campusName: string): Building[] {
    let newBuildings : Building[];
    newBuildings = new Array<Building>();
    for (let i in this.buildings){
      if(this.buildings[i].campusName == campusName){
        newBuildings.push(this.buildings[i]);
      }
    }
    return newBuildings;
  }

  getUniqueListOfCampuses(): Building[] {
    let campusList: Building[] = new Array<Building>();
    let simpleList = []; //just to help use its find method for a unique list
    for( let i in this.buildings){
      if(!simpleList.find(x => x == this.buildings[i].campusName)){
        simpleList.push(this.buildings[i].campusName);
        campusList.push(this.buildings[i]);
      }
    }
    return campusList;
  }
  getNow(): string {
    let time = moment().minutes();
    let mins = 0;
    let hours = moment().hours();


    if(time > 45) {
      mins = 0;
      hours = (moment().hours() + 1);
    }
    else if(time > 30){
      mins = 45;

    }
    else if(time > 15){
      mins = 30;
    }
    else if(time > 0){
      mins = 15;
    }

    if(hours > 24){
      hours = 1;
    }
    /*
    if(hours > 12){
      hours = hours -12;
    }
    */
    //return now;
    return moment().hour(hours).minutes(mins).format('hh:mm');
  };

  //on Campus dropdown change event handler
  CampusChange(value): void {
    this.optionBuildings = this.getBuildingsByCampus(value);


  }
}
