import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';
import { WatchlistService } from 'src/app/services/watchlist-service/watchlist.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  movies: any[] = [] 
  id!: string
  genre!: string
  genreId!: string
  pages: any[] = []
  currentPage!: number
  totalPages!: number
  totalResults!: number
  // currentPage!: number
  
  constructor(private activatedRoute: ActivatedRoute, 
    private movieApiService: MovieApiService, 
    private http: HttpClient,
    private watchlistService: WatchlistService) {
    activatedRoute.params.pipe(switchMap(params => {
      this.pages = []
      this.currentPage = parseInt(params.page)
      this.genre = params.genre
      this.genreId = params.id
      let movies = this.movieApiService.fetchGenre(params.id, params.page).pipe(switchMap(result =>{ 
        this.totalPages = result.total_pages > 500 ? 500 : result.total_pages
        this.totalResults = result.total_results
        for (let i = params.page - 3; i < parseInt(params.page) + 4; i++) {  
          if(i > 0 && i < this.totalPages){
            this.pages.push(i)
          }
          
        }
        return this.watchlistService.watchlistAsObservable().pipe(map(watchlist =>{
          return this.watchlistService.filterWatchlist(watchlist, result.results);
        }))
      }))
      return movies  
    })).subscribe(movies => this.movies = movies)

  }

  ngOnInit(): void {

  }

}
