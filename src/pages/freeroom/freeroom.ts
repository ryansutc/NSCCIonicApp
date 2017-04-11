import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import {FreeRoomService} from "../../app/freeroom.service";
import 'rxjs/add/operator/map'; //reactive extensions library and Observables
import {MomentModule} from 'angular2-moment/module';
import * as moment from 'moment';
import {Building} from "../../app/building";
import {ListPage} from "../list/list";
import {CalendarPage} from "../calendar/calendar";


//NEW RESULTS PAGE
@Component({
  templateUrl: 'freeroom-results.html',
})
export class FreeRoomResultsPage {
  //public rooms: string[] = new Array<string>();
  rooms: any;
  public day: Date = new Date();
  icon: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http){
    this.icon = 'ion-android-calendar';
  }

  ngOnInit(): void {
    this.rooms = [];
    let today = this.GetDayOfWeekString(this.day.getDay());
    let campus = this.navParams.get('campus');
    let building = this.navParams.get('building');
    let roomtype = this.navParams.get('roomtype');
    let timeparse = this.navParams.get('starttime').split(':');
    let starttime = timeparse[0]+ "" + timeparse[1];
    let myday = this.GetDayOfWeekString(this.day.getDay());
    let url = 'http://nsccsucks.xyz/FreeRoomUntil/roomData/' + campus + '/'
      + building + '/' + starttime + '/' + myday + '/' + roomtype;
    //Get returns results in form of an observable, map converts to JSON, subscribe allows access/iteration
    ////http://nsccsucks.xyz/FreeRoomUntil/roomData/INSTI/ITC/0800/Wednesday
    this.http.get(url).map(res => res.json()).subscribe(data => {
        for (let room of data) {
          let roomResults = {
            Room: room.Room,
            AvailUntil: room.AvailUntil,
            AvailMsg: this.GetTimeLengthMsg(this.navParams.get('starttime'), room.AvailUntil)
          };
          this.rooms.push(roomResults);
        }
        //this.rooms = data;
        //console.log(this.rooms);
      },
      err => {
        console.log("Oops!");
      });

    /*
    this.http.get(url)
      .toPromise()
      .then(response => response.json().data.Room as string[])
      .catch(this.handleError)
    */


  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
  }

  GetDayOfWeekString(dayInt: number){
    let weekday = new Array(7);
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[dayInt];
  }

  GetTimeLengthMsg(startTime: Date, AvailUntil: Date): string {
    let AvailMsg = '';

    if(AvailUntil){
      let $timeLength = this.GetTimeLength(startTime, AvailUntil);
      let $hrLength = Math.floor($timeLength/60);
      let $minLength = $timeLength % 60;
      if($timeLength >= 120){
        AvailMsg = "Available for next ~" + $hrLength + " hours";
      }
      else if($timeLength > 60) {
        AvailMsg = "Available for next hour and " + $minLength + " mins";
      }
      else if($timeLength == 60){
        AvailMsg = "Available for next hour";
      }
      else {
        AvailMsg = "Available for next " + $minLength + " minutes";
      }
    }
    else {
      AvailMsg = "Available rest of day";
    }
    return AvailMsg;
  }


  GetTimeLength(startTime: Date, endTime: Date): number {
    let $endTimeStr = endTime.toString();
    let hours = Number($endTimeStr.match(/^(\d+)/)[1]);
    let minutes = Number($endTimeStr.match(/:(\d+)/)[1]);
    let $endTimeDate =  new Date(1,1,1,hours,minutes);
    let $startTimeDate = new Date(1,1,1, Number(startTime.toString().substr(0,2)), Number(startTime.toString().substr(3,2)));
    return (($endTimeDate.getTime() - $startTimeDate.getTime()) /60) / 1000;

  }

  itemTapped(event, room) {
    // That's right, we're pushing to ourselves!
    //alert(room.Room);
    this.navCtrl.push(CalendarPage, {
      roomname: room.Room
    });
  }
}


//------------------------------------------------
@Component({
  selector: 'page-freeroom',
  templateUrl: 'freeroom.html',
  //providers: [FreeRoomService] // Component requires FreeRoomService for data to put into page (dependency injection)
})
export class FreeRoomPage implements OnInit {
  public buildings: Building[] = new Array<Building>();
  public campuses;
  public optionBuildings: Building[] = new Array<Building>();
  public optionRoomTypes: string[] = [];
  public selCampus: string = "INSTI";
  selBuilding: string = "ITC";
  selRoomType: string;
  selStartTime: string;
  public rootPage: any = FreeRoomResultsPage;

  constructor(public navCtrl: NavController, public http: Http) { }

  ngOnInit(): void {

    this.selStartTime = this.getNow().toString();
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
        this.CampusChange('INSTI'); //HACK FOR NOW [todo: fix to make dynamic]
        //this.selBuilding = this.optionBuildings[0].buildingId;
      },
      err => {
        console.log("Oops!");
      });
  }

  //Get list of relevant Buildings by a CampusName
  getBuildingsByCampusId(campusId: string): Building[] {
    let newBuildings : Building[];
    newBuildings = new Array<Building>();
    for (let i in this.buildings){
      if(this.buildings[i].campusId == campusId){
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
    return moment().hour(hours).minutes(mins).format('HH:mm');
  };

  //on Campus dropdown change event handler
  CampusChange(value): void {
    //getBuildings by NEW campusID
    this.optionBuildings = this.getBuildingsByCampusId(value);
    //Update Selected Building
    this.selBuilding = this.optionBuildings[0].buildingId; //update selected building to 1st in list
    this.BuildingChange(this.selBuilding);
  }

  //on building dropdown change event (note that campus
  //change will trigger this event b/c it updates building
  BuildingChange(value): void {
    //set the room type options
    this.optionRoomTypes = [];

    //make get request for this: http://nsccsucks.xyz/FreeRoom/roomTypeData/ITC
    this.http.get('http://nsccsucks.xyz/FreeRoom/roomTypeData/' + this.selBuilding).map(res => res.json()).subscribe(data => {

        for (let roomtype of data) {
          this.optionRoomTypes.push(roomtype.RoomType);
        }
        if(!this.optionRoomTypes.find(x => x == this.selRoomType)){
          this.selRoomType = this.optionRoomTypes[0];
        }
      },
      err => {
        console.log("Oops!");
      });
  }

  //Switch to the results Page
  openResultsPage(item){
    //http://nsccsucks.xyz/FreeRoomUntil/roomData/INSTI/ITC/0800/Wednesday
    let searchParams = {
      campus: this.selCampus,
      building: this.selBuilding,
      roomtype: this.selRoomType,
      starttime: this.selStartTime,
    };
    this.navCtrl.push(FreeRoomResultsPage, searchParams);
  }


}
