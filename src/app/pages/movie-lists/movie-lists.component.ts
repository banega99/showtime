import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-movie-lists',
  templateUrl: './movie-lists.component.html',
  styleUrls: ['./movie-lists.component.css']
})
export class MovieListsComponent {
  movies: any[] = [] 
  pages: any[] = []
  currentPage!: number
  totalPages!: number
  totalResults!: number
  movieList!: any
  title!: string
  constructor(private activatedRoute: ActivatedRoute, 
    private movieApiService: MovieApiService, 
    private http: HttpClient,) {
      
    activatedRoute.params.subscribe(params => {
      this.pages = []
      this.currentPage = parseInt(params.page)
      if(!params) return
      if(params.list == 'trending'){
        this.movieApiService.trendingApiData(params.page)
        .subscribe(result =>{ 
          this.movies = result.results
          console.log(result.results);
          
          this.totalPages = result.total_pages > 500 ? 500 : result.total_pages
          this.totalResults = result.total_results
          for (let i = params.page - 3; i < parseInt(params.page) + 4; i++) {  
            if(i > 0 && i < this.totalPages){
              this.pages.push(i)
            }
            
          }
        })
      }else {
        this.movieApiService.getMovieLists(params.list, params.page).subscribe(result =>{ 
          this.movies = result.results
          console.log(result.results);
          
          this.totalPages = result.total_pages > 500 ? 500 : result.total_pages
          this.totalResults = result.total_results
          for (let i = params.page - 3; i < parseInt(params.page) + 4; i++) {  
            if(i > 0 && i < this.totalPages){
              this.pages.push(i)
            }
            
          }
        })
        
      }
      
      this.movieList = params.list
      this.title = this.makeTitle()

    })

  }

  makeTitle(){
    let [first, second] = this.movieList.split('_')
    first = first.slice(0, 1).toUpperCase() + first.slice(1, first.length)
    second = second?.slice(0, 1).toUpperCase() + second?.slice(1, second?.length) || ''
    console.log(first, second)
    return first + ' ' + second
  }

}
