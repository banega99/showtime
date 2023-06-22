import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, find, map } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchRes$!: Observable<any[]>
  resLength!: number
  constructor(private activatedRoute: ActivatedRoute, private movieApiService: MovieApiService){
    activatedRoute.params.subscribe(params => {
      if(!params) return
      this.searchRes$ = this.movieApiService.getMovieBytitle(params.movieTitle).pipe(map(res => res.results))
      this.movieApiService.getMovieBytitle(params.movieTitle).subscribe(res => this.resLength = res.results.length)
    })

  }


}
