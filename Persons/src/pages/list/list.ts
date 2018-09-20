import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MovieService } from '../../services/rest/movie-service';
import { InfoPage } from '../info/info';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

	movies: Array<any>;

	constructor(public navCtrl: NavController, private movieService: MovieService) {
		this.movieService.getMovies().subscribe(
			data=>
			{
				this.movies =data;
				console.log(data);
			});
		}
	
	selectMovie(event, movie) {
		console.log(movie);  
		this.navCtrl.push(InfoPage, {
			movie: movie
		});
	}	 

}