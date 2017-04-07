import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import {FreeRoomService} from "../../app/freeroom.service";
import 'rxjs/add/operator/map'; //reactive extensions library and Observables
import {MomentModule} from 'angular2-moment/module';
import * as moment from 'moment';

@Component({
  selector: 'page-freeroom',
  templateUrl: 'freeroom.html',
  //providers: [FreeRoomService] // Component requires FreeRoomService for data to put into page (dependency injection)
})
export class FreeRoomPage {
  rooms: any;
  now: string;


  constructor(public navCtrl: NavController, public http: Http) {
    this.rooms = [];
    this.now = this.getNow().toString();
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
    let now = hours.toString() + "" + mins + " " + moment().format(' A').toString();
    //return now;
    return moment().hour(hours).minutes(mins).format('hh:mm');
  };

}
