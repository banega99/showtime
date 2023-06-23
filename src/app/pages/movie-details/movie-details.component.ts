import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie$!: Observable<any>
  movieTrailerUrl$!: Observable<any>
  movieRecommendations$!: Observable<any>
  casts$!: Observable<any>
  id!: string
  castName!: string
  constructor(private movieApiService: MovieApiService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      if(!params) return
      this.movie$ = movieApiService.getMovieDetails(params.id)
      this.movieTrailerUrl$ = this.movieApiService.getMovieVideo(params.id)
      .pipe(map(data => `https://www.themoviedb.org/video/play?key=${data.results[0].key}`))
      this.casts$ = this.movieApiService.getMovieCast(params.id).pipe(map(data => data.cast))
      this.movieRecommendations$ = this.movieApiService.getRecommended(params.id).pipe(map(data => data.results))
      
      // movieApiService.getMovieDetails(params.id).subscribe((results => console.log(results)));
      // this.movieApiService.getMovieCast(params.id).pipe(map(data => data.cast.map((data:any) => data.name.replace(' ', '_')))).subscribe(console.log)
      // this.movieApiService.getMovieCast(params.id).subscribe(console.log)
    })
  }

  ngOnInit(): void {
    // this.movieDetails()
    // this.movieVideo()
  }

  // movieVideo() {
  //   this.movieApiService.getMovieVideo(this.id).subscribe(data => {
  //     this.movieTrailerUrl = `https://www.themoviedb.org/video/play?key=${data.results[0].key}`
  //     console.log(data.results[0].key)
  //   })

  // }

  scrollX(e: any){
    e.preventDefault();
    e.target.closest('.rowposter').scrollBy({
      left: e.deltaY < 0 ? -60 : 60
    })
  }
}


