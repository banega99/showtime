import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  searchRes$!: Observable<any[]>
  resLength!: number
  constructor(private movieApiService: MovieApiService, private activatedRoute: ActivatedRoute){
    activatedRoute.params.subscribe(params =>{
      if(!params) return;
      this.searchRes$ = movieApiService.getFilter(params.genre, params.year, params.country, params.sort).pipe(map(data => data.results))
    })

  }

}
