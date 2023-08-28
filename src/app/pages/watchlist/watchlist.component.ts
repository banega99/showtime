import { Component } from '@angular/core';
import { EMPTY, Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';
import { WatchlistService } from 'src/app/services/watchlist-service/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent {
  movies!: any
  
  constructor(private watchlistService: WatchlistService, private movieApiService: MovieApiService){
    this.watchlistService.watchlistAsObservable().pipe(
      switchMap((watchlist: any) => {
        let movieObservables = watchlist.map((movie: any) =>
          movieApiService.getMovieDetails(movie.id).pipe(
            map((movieDetails: any) => {
              movie.vote_average = movieDetails.vote_average;
              movie.popularity = movieDetails.popularity;
              console.log(movie)
              return movie;
            })
          )
        ) 
        movieObservables = movieObservables 
        this.movies = !movieObservables? [] : null
        console.log(movieObservables)
        return forkJoin(movieObservables)? forkJoin(movieObservables) : of([]);
      })
    ).subscribe(updatedWatchlist => {
      console.log(updatedWatchlist)
      this.movies = updatedWatchlist
    });
  }
}
