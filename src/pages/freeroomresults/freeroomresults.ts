import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import {FreeRoomService} from "../../app/freeroom.service";
import 'rxjs/add/operator/map'; //reactive extensions library and Observables

@Component({
  selector: 'page-freeroomresults',
  templateUrl: 'freeroomresults.html',
  //providers: [FreeRoomService] // Component requires FreeRoomService for data to put into page (dependency injection)
})
export class FreeRoomResultsBasicPage implements OnInit {
  rooms: any;
  icon: string;
  constructor(public navCtrl: NavController, public http: Http) {
    this.icon = 'ion-android-calendar';
  }

  ngOnInit(): void {
    this.rooms = [];
     //Get returns results in form of an observable, map converts to JSON, subscribe allows access/iteration
    this.http.get('http://nsccsucks.xyz/FreeRoom/roomData/INSTI/ITC').map(res => res.json()).subscribe(data => {
        for (let room of data) {
          this.rooms.push(room.Room);
        }
        //this.rooms = data;
        //console.log(this.rooms);
      },
      err => {
        console.log("Oops!");
      });
  }

}
