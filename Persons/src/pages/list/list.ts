import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MovieService } from '../../services/rest/movie-service';
import { InfoPage } from '../info/info';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
	//items = [];
	//movies: Array<any>;
	movies=[];
	pageNumber=0;
	maximumPages=31;
	constructor(public navCtrl: NavController, private movieService: MovieService) {
		this.loadMovies();
		}

		doInfinite(doInfinite?){
			console.log('Begin async operation');
			this.pageNumber = this.pageNumber+1;
			this.movieService.getMoviesPageWise(this.pageNumber).subscribe(
				data=>
				{
					this.movies =data;
					console.log(data);
				});
				
			// for (var i = 0; i < 10; i++) {
			// 	this.movies.push( this.movies.length );
			//   }
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

}