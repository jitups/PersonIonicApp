import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { ListPage } from '../list/list'
//https://www.djamware.com/post/59c53a1280aca768e4d2b143/ionic-3-angular-4-and-sqlite-crud-offline-mobile-app
@IonicPage()
@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.html',
})
export class AddDataPage {

  data = { date:"", type:"", description:"", amount:0 };
  expenses: any = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    private toast: Toast) {
    }

    ionViewDidLoad() {
      this.getData();
    }
    
    ionViewWillEnter() {
      this.getData();
    }

    getData() {
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, type TEXT, description TEXT, amount INT)')
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
        this.toast.show('Fetching all the record','5000','center')
        db.executeSql('SELECT * FROM expense ORDER BY rowid DESC')
        .then(res => {
          this.expenses = [];
          for(var i=0; i<res.rows.length; i++) {
            this.expenses.push({rowid:res.rows.item(i).rowid,date:res.rows.item(i).date,type:res.rows.item(i).type,description:res.rows.item(i).description,amount:res.rows.item(i).amount})
          }
        })
        .catch(e => {
          console.log(e);
          this.toast.show(JSON.stringify(e),'5000','center');
        });

        this.toast.show('Fetching all income','5000','center')
        db.executeSql('SELECT SUM(amount) AS totalIncome FROM expense WHERE type="Income"')
        .then(res => {
          if(res.rows.length>0) {
            this.totalIncome = parseInt(res.rows.item(0).totalIncome);
            this.balance = this.totalIncome-this.totalExpense;
          }
        })
        .catch(e => console.log(e));
        this.toast.show('Total income: ' + this.totalIncome,'5000','center')
        db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense"')
        .then(res => {
          if(res.rows.length>0) {
            this.totalExpense = parseInt(res.rows.item(0).totalExpense);
            this.balance = this.totalIncome-this.totalExpense;
          }
        })
      }).catch(e => console.log(e));
    }

  saveData() {
    console.log('in save data J');
    this.toast.show('Saving data','5000','center');
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO expense VALUES(NULL,?,?,?,?)',[this.data.date,this.data.type,this.data.description,this.data.amount])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e + ' <=J');//JSON.stringify(e) , best way to check the error - Jitu
          this.toast.show('Error while saving the data: ' + JSON.stringify(e), '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }
}
