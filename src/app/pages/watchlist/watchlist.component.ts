import { Component } from '@angular/core';
import { forkJoin, map, switchMap } from 'rxjs';
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
    // this.watchlistService.watchlistAsObservable().pipe(map((watchlist:any)=>{
    //   watchlist.forEach((movie:any) => {
    //     movieApiService.getMovieDetails(movie.id).pipe(map((movieDetails:any) => {
    //       movie.vote_average = movieDetails.vote_average
    //       movie.popularity = movieDetails.popularity
          
    //     })).subscribe()
    //   })
    //   return watchlist
    // })).subscribe(watchlist => this.movies = watchlist)
    this.watchlistService.watchlistAsObservable().pipe(
      switchMap((watchlist: any) => {
        const movieObservables = watchlist.map((movie: any) =>
          movieApiService.getMovieDetails(movie.id).pipe(
            map((movieDetails: any) => {
              movie.vote_average = movieDetails.vote_average;
              movie.popularity = movieDetails.popularity;
              console.log(movie)
              return movie;
            })
          )
        );
        console.log(movieObservables)
        return forkJoin(movieObservables);
      })
    ).subscribe(updatedWatchlist => {
      this.movies = updatedWatchlist;
    });
  }
}
