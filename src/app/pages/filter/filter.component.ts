import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {
  searchRes$!: any[]
  resLength!: number
  genres: any
  years: any
  countries: any
  languages: any
  sort!: string
  sortedBy!: string
  genresNames: any = []
  countriesNames: any = []
  languagesNames: any = []
  totalPages!: number
  totalResults!: number
  pages!: any
  currentPage!: any
  countriesIso!: any
  subscription!: Subscription
    constructor(private movieApiService: MovieApiService, private activatedRoute: ActivatedRoute) {
   
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe(params => {
      if (!params) return;
      this.currentPage = params.page
      this.pages = []
      this.countriesNames = []
      this.languagesNames = []
      this.genresNames = []
      this.years = []
      this.genres = []
      this.countries = []
      this.languages = []
      this.countriesIso = []
      this.sort = params.sort
      this.genres = params.genre
      this.countries = params.coutry
      this.years = !params.year || params.year.length == 0? ['/'] : [params.year] 
      this.languages = params.language
      this.sortedBy = params.sortedBy == ' ' ? '/' : this.sorted(params.sort.split('.')[0], params.sort.split('.')[1])
      this.movieApiService.getFilter(params.genre, params.year, params.country, params.sort, params.language, params.page)
        .subscribe(result => {
          this.searchRes$ = result.results
          // console.log(result)
          this.totalPages = result.total_pages > 500 ? 500 : result.total_pages
          this.totalResults = result.total_results
          for (let i = params.page - 3; i < parseInt(params.page) + 4; i++) {  
            if(i > 0 && i < this.totalPages){
              this.pages.push(i)
            }
            
          }
        });
      params.genre?.forEach((genre: any) => {
        this.movieApiService.getGenres().pipe(map(res => res.genres.filter((res: any) => res.id == genre)))
          .subscribe(res => {
            if(!res[0])return
            this.genresNames.push(res[0])
          })
      });
      params.country?.forEach((country: any) => {
        console.log(country)
        this.movieApiService.getAllCountries()
        .pipe(map(res => res.filter((res: any) => res.iso_3166_1 == country)))
          .subscribe(res => {
            if(!res[0])return
            this.countriesNames.push(res[0])
            res.forEach((country: any) => this.countriesIso.push(country.iso_3166_1))
          })
      });
      params.language?.forEach((language: any) => {
        console.log(language)
        this.movieApiService.getAllLanguages()
        .pipe(map(res => res.filter((res: any) => res.iso_639_1 == language)))
          .subscribe(res => {
            if(!res[0])return
            this.languagesNames.push(res[0])
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
