import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';
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
	searchTerm: string = '';
  searchControl: FormControl;
	movies=[];
	pageNumber=1;
	maximumPages=31;
	constructor(public navCtrl: NavController, private movieService: MovieService) {
		this.searchControl = new FormControl();
		this.loadMovies();
		}

		ionViewDidLoad() {
			this.setFilteredItems();
			this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
					this.setFilteredItems();
			});
	}

	setFilteredItems() {

			//this.movies = this.movieService.searchMoviesPageWise(this.pageNumber, this.searchTerm);
			this.movies=[];
			this.movieService.searchMoviesPageWise(this.pageNumber, this.searchTerm).subscribe(
				data=>
				{
					this.movies = this.movies.concat(data);
					console.log(data);
				}
			);

	}


		  loadMovies(infiniteScroll?){
				if(this.searchTerm ==''){
					this.movieService.getMoviesPageWise(this.pageNumber).subscribe(
						data=>
						{
							this.movies = this.movies.concat(data);
							console.log(data);
						});
				}
				else{
					this.movieService.searchMoviesPageWise(this.pageNumber, this.searchTerm).subscribe(
						data=>
						{
							this.movies = this.movies.concat(data);
							console.log(data);
						}
					);
				}
			

				if (infiniteScroll) {
					infiniteScroll.complete();
				  }
		  }

		  loadMore(infiniteScroll) {
			this.pageNumber++;
			this.loadMovies(infiniteScroll);
		 
			if (this.pageNumber === this.maximumPages) {
			  infiniteScroll.enable(false);
				}
			}
			
			searchMovie(movieName,infiniteScroll?){
				this.movieService.searchMoviesPageWise(this.pageNumber,movieName).subscribe(
				data=>
				{
					this.movies = this.movies.concat(data);
					console.log(data);
				});
				
				if (infiniteScroll) {
					infiniteScroll.complete();
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