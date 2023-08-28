import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { MovieVideosComponent } from 'src/app/partial/movie-videos/movie-videos.component';
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
  casts!: any
  id!: string
  castName!: string
  watchlist: boolean = false
  reviews!: any
  totalReviews!: number
  avatarUrl!: string
  backdrops!: any
  castLength!: number
  videos: any = []
  moreVideos: any = []
  year!: string
  countries!: any
  @ViewChild('videos') videosCont!: MovieVideosComponent
  constructor(private movieApiService: MovieApiService, private activatedRoute: ActivatedRoute,
    private watchlistService: WatchlistService) {
    this.countries = []
    this.videos = []
    this.moreVideos = []
    activatedRoute.params.pipe(switchMap(params => {
      if (!params) return of(null);
      let countriesWatchObs = movieApiService.getMovieDetails(params.id).pipe(switchMap(movieDetails => {
        let countries = movieDetails.production_countries.map((country: any) => {
          return movieApiService.getAllCountries().pipe(tap(countries => {
            return this.countries.push(countries.filter((country2: any) => country2.english_name === country.name)[0])
          }))

        })
        this.year = movieDetails.release_date.slice(0, 4)
        let watchlist = watchlistService.watchlistAsObservable().pipe(
          map(watchlist => {
            return watchlist.some((movie: any) => movie.id == movieDetails.id)
          }),
          tap((res) => {
            movieDetails.watchlist = res
            this.movie = movieDetails
          })
        )
        return forkJoin(...countries, watchlist)
      }))
      this.movieTrailerUrl$ = this.movieApiService.getMovieVideo(params.id)
        .pipe(map(data => `https://www.themoviedb.org/video/play?key=${data.results[1]?.key}`))
      let castsObs = this.movieApiService.getMovieCast(params.id).pipe(tap(data => {
        this.casts = data.cast
      }))
      let recObs = this.movieApiService.getRecommended(params.id).pipe(map(data => this.movieRecommendations = data.results))
      let revsObs = movieApiService.getMovieReviews(params.id).pipe(tap(reviews => {
        this.totalReviews = reviews.total_results
        this.reviews = reviews.results
      }))
      let imgsObs = movieApiService.getMovieImages(params.id).pipe(tap(images => {
        this.backdrops = images.backdrops
      }))

      let videosObs = this.movieApiService.getMovieVideo(params.id).pipe(tap(videos => {
        videos.results.slice(0, 4).forEach((element: any) => {
          let url = `https://www.themoviedb.org/video/play?key=${element?.key}`
          this.videos.push(url)
        });
        videos.results.slice(0, 9).forEach((element: any) => {
          let url = `https://www.themoviedb.org/video/play?key=${element?.key}`
          this.moreVideos.push(url)
        });
      }))
      return forkJoin(countriesWatchObs, castsObs, recObs, revsObs, imgsObs, videosObs)
    })).subscribe()

  }

  addToWatchlist(movie: any, imgUrl: any) {
    this.watchlistService.addToWatchlist(movie, imgUrl)
  }

  expandReview(p: any, rc: any, a: any) {
    // console.log(rc.classList)
    rc.classList.toggle('review-expand')
    a.classList.toggle('arrow-rotate')
  }

  scrollToDet(section: any) {
    section.scrollIntoView()
  }
  scrollToRec(section: any) {
    section.scrollIntoView()
  }
  scrollToCast(section: any) {
    section.scrollIntoView()
  }
  scrollToRev(section: any) {
    section.scrollIntoView()
  }


}


