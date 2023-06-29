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
  constructor(private movieApiService: MovieApiService, private activatedRoute: ActivatedRoute,
    private watchlistService: WatchlistService) {
    activatedRoute.params.subscribe(params => {
      if (!params) return
      movieApiService.getMovieDetails(params.id).subscribe(movieDetails => {
        console.log(movieDetails)
        this.movie = movieDetails
        watchlistService.watchlistAsObservable().pipe(map(watchlist => {
          return watchlist.some((movie: any) => movie.id == movieDetails.id)
        })).subscribe(res => {
          this.watchlist = res
        })
      })
      this.movieTrailerUrl$ = this.movieApiService.getMovieVideo(params.id)
        .pipe(map(data => `https://www.themoviedb.org/video/play?key=${data.results[1]?.key}`))
      this.movieApiService.getMovieCast(params.id).pipe(map(data => {
        return data.cast
      })).subscribe(data => {
        this.casts = data
      })
      this.movieApiService.getRecommended(params.id).pipe(map(data => data.results))
        .subscribe(res => this.movieRecommendations = res)
      movieApiService.getMovieReviews(params.id).subscribe(reviews => {
        this.totalReviews = reviews.total_results
        this.reviews = reviews.results
        console.log(reviews.results)
      })
      movieApiService.getMovieImages(params.id).subscribe(images => {
        this.backdrops = images.backdrops
      })

      this.movieApiService.getMovieVideo(params.id).subscribe(videos=> {
        console.log(videos)
        videos.results.slice(0, 4).forEach((element:any) => {
          let url = `https://www.themoviedb.org/video/play?key=${element?.key}`
          this.videos.push(url)
        });
        videos.results.slice(0, 9).forEach((element:any) => {
          let url = `https://www.themoviedb.org/video/play?key=${element?.key}`
          this.moreVideos.push(url)
        });
      })
    })

  }

  addToWatchlist(movie: any, imgUrl: any) {
    this.watchlistService.addToWatchlist(movie, imgUrl)
  }

  expandReview(p: any, rc: any, a: any) {
    console.log(rc.classList)
    rc.classList.toggle('review-expand')
    a.classList.toggle('arrow-rotate')
  }

  scrollToDet(section: any){
    section.scrollIntoView()
  }
  scrollToRec(section: any){
    section.scrollIntoView()
  }
  scrollToCast(section: any){
    section.scrollIntoView()
  }
  scrollToRev(section: any){
    section.scrollIntoView()
  }

  showVideos(section: any){
    section.classList.toggle('videos-show')
  }

  hideVideos(section: any){
    section.classList.toggle('videos-show')
  }

}


