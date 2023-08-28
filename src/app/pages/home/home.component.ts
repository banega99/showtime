import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bannerMovies!: any
  trendingMovies!: any
  topRatedMovies!: any
  nowPlayingMovies!: any
  upcomingMovies!: any
  popularMovies!: any
  genres!: any
  constructor(private movieApiService: MovieApiService){
  }

  ngOnInit(){
    this.bannerData()
    this.trendingData()
    this.upcomingData()
    this.topRatedData()
    this.nowPlayingData()
    this.popularData()
    this.movieApiService.getGenres().subscribe(res => {
      // console.log(res)
      this.genres = res.genres
    })
  }

  bannerData(){
    this.movieApiService.bannerApiData().pipe(switchMap(data => {
      let genresObs = data.results.map((movie: any) => {
        return this.movieApiService.getGenres().pipe(map((genre: any) => {
          let filteredGenres = genre.genres.filter(({id: id1}: any) => {
            return movie.genre_ids.some((id2: any) => id1 === id2)
          })
          movie.genre_names = filteredGenres
          return movie
        }))
      })
      return forkJoin(genresObs)
    })).subscribe(movieResults => this.bannerMovies = movieResults)
    
    
  }
  trendingData(){
    this.movieApiService.trendingApiData('1').subscribe(data => this.trendingMovies = data.results);
  }
  topRatedData(){
    this.movieApiService.getTopRated().subscribe(data => this.topRatedMovies = data.results);
  }
  upcomingData(){
    this.movieApiService.getUpcoming().subscribe(data => this.upcomingMovies = data.results);
  }
  nowPlayingData(){
    this.movieApiService.getNowPlaying().subscribe(data => this.nowPlayingMovies = data.results);
  }
  popularData(){
    this.movieApiService.getPopular().subscribe(data => this.popularMovies = data.results);
  }

}
