import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { MovieService } from '../../services/rest/movie-service';
import { ListPage } from '../list/list';

/**
 * Generated class for the AddRatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-rating',
  templateUrl: 'add-rating.html',
})
export class AddRatingPage {
  movieId=0;
  rating = { userMovieRatingID:0, movieId:this.movieId, rating:""};
  constructor(public navCtrl: NavController,
             public navParams: NavParams, 
             public platform:Platform, 
             private movieService: MovieService, 
             private toast:Toast) {
                platform.registerBackButtonAction(()=>{},1);
                this.movieId= this.navParams.get('movieId');
                this.rating={ userMovieRatingID:0, movieId:this.movieId, rating:""};
                console.log('ctr ' + this.movieId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRatingPage');
  }

  saveRating(){
    console.log(this.rating);
    this.movieService.addRating(this.rating);
    console.log('added');
    this.toast.show('Rating added','5000','center');
    this.navCtrl.push(ListPage);
  }

  cancel(){
    this.navCtrl.push(ListPage);
  }
}
