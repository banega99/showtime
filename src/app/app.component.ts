import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiService } from './services/movie-api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'showtime';
  genres!: any[]
  navbg: any
  constructor(private route: Router, private movieApiService: MovieApiService){
    this.movieApiService.getGenres().subscribe(genres => this.genres = genres.genres)
  }
  @HostListener('document:scroll') scrollover(){
    if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0){
      this.navbg = {
        'background-color': '#000000'
      }
    } else {
      this.navbg = {
        'background-color': '#000000'
      }
    }
  }

  search(s: string){
    this.route.navigateByUrl('search/' + s)
  }

  checkValue(s: number){
    console.log(s)
  }
}
