import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MovieService } from '../../services/rest/movie-service';
import { InfoPage } from '../info/info';
import { AddDataPage } from '../add-data/add-data'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
	//items = [];
	//movies: Array<any>;
	movies=[];
	pageNumber=1;
	maximumPages=31;
	constructor(public navCtrl: NavController, private movieService: MovieService) {
		this.loadMovies();
		}

		  loadMovies(infiniteScroll?){
			this.movieService.getMoviesPageWise(this.pageNumber).subscribe(
				data=>
				{
					this.movies = this.movies.concat(data);
					console.log(data);
				});
				if (infiniteScroll) {
					infiniteScroll.complete();
				  }
			// for (var i = 0; i < 10; i++) {
			// 	this.movies.push( this.movies.length );
			//   }
		  }

		  loadMore(infiniteScroll) {
			this.pageNumber++;
			this.loadMovies(infiniteScroll);
		 
			if (this.pageNumber === this.maximumPages) {
			  infiniteScroll.enable(false);
				}
		  }
	
		selectMovie(event, movie) {
			console.log(movie);  
			this.navCtrl.push(InfoPage, {
				movie: movie
			});
		}	 

		
		navigateToOtherScreen(){
			console.log('clicked');
			this.navCtrl.push('AddDataPage');
		};

}