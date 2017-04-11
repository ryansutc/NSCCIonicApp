import { Directive, Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import "jquery";
import 'moment';
import { ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {ScheduleModule} from 'primeng/primeng';
import {Routes} from "@angular/router";

declare var $: any;
declare let jQuery:any;

@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

  public roomNo: string;
  public calendarOptions:Object = {
    height: 'parent',
    contentHeight: 'auto',
    fixedWeekCount : false,
    defaultDate: '2016-09-12',
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    defaultView: 'agendaWeek',
    allDaySlot: false,
    minTime: '06:00:00',
    maxTime: '23:00:00',
    header: {
      left: '',
      center: 'prev, title, next',
      right: ''
    },
    events: [
      {
        title: 'All Day Event',
        start: '2016-09-01'
      },
      {
        title: 'Long Event',
        start: '2016-09-07',
        end: '2016-09-10'
      }
    ]
  }
  events: any[]; //for primng version

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.roomNo = this.navParams.get('roomname');
  }

  ngOnInit() {
    this.events = [
      {
        "title": "All Day Event",
        "start": "2016-01-01"
      },
      {
        "title": "Long Event",
        "start": "2016-01-07",
        "end": "2016-01-10"
      },
      {
        "title": "Repeating Event",
        "start": "2016-01-09T16:00:00"
      },
      {
        "title": "Repeating Event",
        "start": "2016-01-16T16:00:00"
      },
      {
        "title": "Conference",
        "start": "2016-01-11",
        "end": "2016-01-13"
      }
    ];
  }
}
