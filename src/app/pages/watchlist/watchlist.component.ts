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
    this.watchlistService.watchlistAsObservable().subscribe(watchlist=>{
      
      if(!watchlist)return
      watchlist.forEach((movie:any) => {
        movieApiService.getMovieDetails(movie.id).pipe(map((movieDetails:any) => {
          movie = movieDetails
          this.movies = watchlist
        })).subscribe()
      })
    })
  }
}
