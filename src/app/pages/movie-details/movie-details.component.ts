import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';
import { WatchlistService } from 'src/app/services/watchlist-service/watchlist.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  movie: any
  movieTrailerUrl$!: Observable<any>
  movieRecommendations!: any
  casts$!: Observable<any>
  id!: string
  castName!: string
  watchlist: boolean = false
  constructor(private movieApiService: MovieApiService, private activatedRoute: ActivatedRoute,
    private watchlistService: WatchlistService) {
    activatedRoute.params.subscribe(params => {
      if (!params) return
      movieApiService.getMovieDetails(params.id).subscribe(movieDetails => {
        this.movie = movieDetails
        watchlistService.watchlistAsObservable().pipe(map(watchlist => {
          return watchlist.some((movie:any )=> movie.id == movieDetails.id)
        })).subscribe(res => this.watchlist = res)
      })
      this.movieTrailerUrl$ = this.movieApiService.getMovieVideo(params.id)
        .pipe(map(data => `https://www.themoviedb.org/video/play?key=${data.results[1].key}`))
      this.casts$ = this.movieApiService.getMovieCast(params.id).pipe(map(data => data.cast))
      this.movieApiService.getRecommended(params.id).pipe(map(data => data.results))
        .subscribe(res => this.movieRecommendations = res)
      // movieApiService.getMovieDetails(params.id).
      //   subscribe((results => console.log(results)));
    })
  }

  addToWatchlist(movie: any, imgUrl: any) {
    this.watchlistService.addToWatchlist(movie, imgUrl)
  }

}


