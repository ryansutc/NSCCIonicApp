import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {FreeRoomPage, FreeRoomResultsPage} from '../pages/freeroom/freeroom';
//import { FreeRoomResultsBasicPage } from '../pages/freeroomresults/freeroomresults';
//import { FreeRoomService } from 'freeroom.service'; //should this be in same directory?

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule }    from '@angular/http';
import {FreeRoomResultsBasicPage} from "../pages/freeroomresults/freeroomresults";
import {CalendarPage} from "../pages/calendar/calendar";

import * as jQuery from "jquery"
import { MomentModule } from 'angular2-moment';
import { ScheduleModule } from 'primeng/primeng';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    FreeRoomPage,
    FreeRoomResultsPage,
    FreeRoomResultsBasicPage,
    CalendarPage
    //FreeRoomService
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    MomentModule,
    ScheduleModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    FreeRoomPage,
    FreeRoomResultsPage,
    FreeRoomResultsBasicPage,
    CalendarPage
    //FreeRoomService
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
