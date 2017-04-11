import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {
  public roomNo: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.roomNo = this.navParams.get('roomname');
  }

}
