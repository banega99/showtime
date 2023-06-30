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
  searchRes$!: any[]
  resLength!: number
  genres: any[] = []
  years!: string[]
  countries!: any[]
  sortedBy!: string
  constructor(private movieApiService: MovieApiService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      if (!params) return;
      this.genres = []
      this.countries = []
      this.years = params.year == ' ' ? ['/'] : params.year.split(',')
      this.sortedBy = params.sortedBy == ' ' ? '/' : this.sorted(params.sort.split('.')[0], params.sort.split('.')[1])
      movieApiService.getFilter(params.genre, params.year, params.country, params.sort).pipe(map(data => data.results))
        .subscribe(results => {
          this.searchRes$ = results
        })
      params.genre.split(',').forEach((genre: any) => {
        movieApiService.getGenres().pipe(map(res => res.genres.filter((res: any) => res.id == genre)))
          .subscribe(res => {
            if(!res[0])return
            this.genres.push(res[0])
          })
      });
      params.country.split(',').forEach((country: any) => {
        movieApiService.getAllCountries()
        .pipe(map(res => res.filter((res: any) => res.iso_639_1 == country)))
          .subscribe(res => {
            if(!res[0])return
            this.countries.push(res[0])
          })
      });
    })
  }

  sorted(first: string, second: string){
      let firstToUpper = first == 'vote_average'? 'Rating': first.slice(0, 1).toUpperCase() + first.slice(1, first.length)
      let secondEnding = second + 'ending'
      let joined = firstToUpper + " " + secondEnding
      return joined
  }

}
