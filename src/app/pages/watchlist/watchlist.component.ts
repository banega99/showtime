import { Component } from '@angular/core';
import { map } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';
import { WatchlistService } from 'src/app/services/watchlist-service/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent {
  movies: string[] = []
  movies1: string[] = []
  
  constructor(private watchlistService: WatchlistService, private movieApiService: MovieApiService){
    this.watchlistService.watchlistAsObservable().pipe(map((watchlist:any)=>{
      watchlist.forEach((movie:any) => {
        movieApiService.getMovieDetails(movie.id).pipe(map((movieDetails:any) => {
          movie.vote_average = movieDetails.vote_average
          movie.popularity = movieDetails.popularity
          
        })).subscribe()
      })
      return watchlist
    })).subscribe(watchlist => this.movies = watchlist)
  }
}
