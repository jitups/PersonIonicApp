import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonServiceProvider } from '../../providers/person-service/person-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: any;
  constructor(public navCtrl: NavController, public personServiceProvider: PersonServiceProvider) {
    this.getUsers();
  }
  getUsers() {
    this.personServiceProvider.getUsers()
    .then(data => {
      this.users = data;
      console.log(this.users);
    });
  }
}
