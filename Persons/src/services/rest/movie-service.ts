import { Injectable } from '@angular/core';
//import { HttpHeaders} from '@angular/common/http';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService {
    
    constructor(private http:Http) {

    }

    getMovies() {
        let headers = new Headers();
        headers.append('Authorization', this.make_base_auth("webappuser", "Jitu@123"));

        //var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI("test") + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        var url = 'https://mvcwebapi-215708.appspot.com/api/Movie';
        var response = this.http.get(url,{headers:headers}).map(res => res.json());
        return response;
    }

    getMoviesPageWise(pageId) {
        let headers = new Headers();
        headers.append('Authorization', this.make_base_auth("webappuser", "Jitu@123"));

        //var url = 'http://api.themoviedb.org/3/search/movie?query=&query=' + encodeURI("test") + '&api_key=5fbddf6b517048e25bc3ac1bbeafb919';
        //var url = 'https://mvcwebapi-215708.appspot.com/api/Movie?pageId='+pageId;
        var url = 'https://mvcwebapi-215708.appspot.com/api/Movie/GetPagewise/'+pageId;
        var response = this.http.get(url,{headers:headers}).map(res => res.json());
        return response;
    }

    make_base_auth(user, password) {
        var tok = user + ':' + password;
        var hash = btoa(tok);
        return "Basic " + hash;
    }
    
   
}