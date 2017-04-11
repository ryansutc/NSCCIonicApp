import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    this.items.push({
      title: 'Locate',
      note: 'View NSCC Room Map (non mobile)',
      icon: this.icons[5]
    });
    this.items.push({
      title: 'RoomSchedule',
      note: 'View NSCC Room Calendar (non mobile)',
      icon: this.icons[1]
    });
    this.items.push({
      title: 'About',
      note: 'View NSCC Room Calendar (non mobile)',
      icon: this.icons[1]
    });
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    if(item.title != 'About'){
      window.location.href='http://nsccsucks.xyz/' + item.title;//'item.title';
    }

    this.navCtrl.push(ListPage, {
      item: item
    });
  }
}
