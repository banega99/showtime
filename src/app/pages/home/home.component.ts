import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
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
  constructor(private movieApiService: MovieApiService){
  }

  ngOnInit(){
    this.bannerData()
    this.trendingData()
    this.upcomingData()
    this.topRatedData()
    this.nowPlayingData()
    this.popularData()
  }

  bannerData(){
    this.movieApiService.bannerApiData().subscribe(data => this.bannerMovies = data.results);
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
