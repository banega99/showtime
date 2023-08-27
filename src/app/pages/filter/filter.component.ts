import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { MovieApiService } from 'src/app/services/movie-api-service.service';
import { NavigationRouterService } from 'src/app/services/navigation-router-service/navigation-router.service';
import { WatchlistService } from 'src/app/services/watchlist-service/watchlist.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnChanges, OnInit  {
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
  companyName: any = ''
  companyId!: any
  constructor(private movieApiService: MovieApiService,
    private activatedRoute: ActivatedRoute,
    private watchlistService: WatchlistService,
    private navService: NavigationRouterService,
    private router: Router,) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (!params) return;
      this.totalResults = 0
      this.companyName = ''
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
      this.genres = typeof (params?.genre) === 'string' ? [params.genre] : params.genre
      this.countries = params.coutry
      this.years = !params.year || params?.year.length == 0 ? [] : params?.year
      this.years = typeof (params?.year) === 'string' ? [this.years] : this.years

      this.languages = typeof (params?.language) === 'string' ? [params.language] : params?.language
      this.sortedBy = params?.sortedBy == ' ' ? '/' : this.sorted(params?.sort.split('.')[0], params?.sort.split('.')[1])
      if (params?.company) {
        // console.log(params.company)
        this.movieApiService.getCompany(params?.company).subscribe(company => {
          // console.log(company)
          this.companyName = company.name
          this.companyId = company.id
        })
      }

      this.filterResults(params?.genre, params?.year, params?.country, params?.company, params?.sort, params?.language, params?.page, '')
      if (params?.genre) {
        if (typeof (params?.genre) === 'object') {
          params?.genre?.forEach((genre: any) => {
            this.movieApiService.getGenres().pipe(map(res => res.genres.filter((res: any) => res.id == genre)))
              .subscribe(res => {
                if (!res[0]) return
                this.genresNames.push(res[0])
              })
          });
        } else {
          this.movieApiService.getGenres().pipe(map(res => res.genres.filter((res: any) => res.id == params.genre)))
            .subscribe(res => {
              if (!res[0]) return
              this.genresNames.push(res[0])
            })
        }
      }
      if (params.country) {
        if (typeof (params.country) === 'object') {
          params.country?.forEach((country: any) => {
            // console.log(country)
            this.movieApiService.getAllCountries()
              .pipe(map(res => res.filter((res: any) => res.iso_3166_1 == country)))
              .subscribe(res => {
                if (!res[0]) return
                this.countriesNames.push(res[0])
                res.forEach((country: any) => this.countriesIso.push(country.iso_3166_1))
              })
          });
        } else {
          this.movieApiService.getAllCountries()
            .pipe(map(res => res.filter((res: any) => res.iso_3166_1 == params.country)))
            .subscribe(res => {
              if (!res[0]) return
              this.countriesNames.push(res[0])
              res.forEach((country: any) => this.countriesIso.push(country.iso_3166_1))
            })
        }
      }
      if (params.language) {
        if (typeof (params.language) === 'object') {
          params.language?.forEach((language: any) => {
            // console.log(language)
            this.movieApiService.getAllLanguages()
              .pipe(map(res => res.filter((res: any) => res.iso_639_1 == language)))
              .subscribe(res => {
                if (!res[0]) return
                this.languagesNames.push(res[0])
              })
          });
        } else {
          this.movieApiService.getAllLanguages()
            .pipe(map(res => res.filter((res: any) => res.iso_639_1 == params.language)))
            .subscribe(res => {
              if (!res[0]) return
              this.languagesNames.push(res[0])
            })
        }
      }
    })
  }

  

  sorted(first: string, second: string) {
    let firstToUpper = first == 'vote_average' ? 'Rating' : first.slice(0, 1).toUpperCase() + first.slice(1, first.length)
    let secondEnding = second + 'ending'
    let joined = firstToUpper + " " + secondEnding
    return joined
  }

  removeFilter(filText: any, filType: string, e: any) {
    // e.target.closest('.gray').style.textDecoration = 'line-through'
    if (filType == 'genre') {
      let index = this.genres.indexOf(String(filText))
      this.genres.splice(index, 1)
      this.genresNames = this.genresNames.filter((genre: any) => genre.id != filText)
    } else if (filType == 'year') {
      let index = this.years.indexOf(filText)
      this.years.splice(index, 1)
    } else if (filType == 'country') {
      let index = this.countriesIso.indexOf(filText)
      this.countriesIso.splice(index, 1)
      this.countriesNames = this.countriesNames.filter((country: any) => country.iso_3166_1 != filText)

    } else if (filType == 'language') {
      let index = this.languages.indexOf(filText)
      this.languages.splice(index, 1)
      this.languagesNames = this.languagesNames.filter((language: any) => language.iso_639_1 != filText)
    }
    this.filterResults(this.genres, this.years, this.countriesIso, '', this.sort, this.languages, 1, 'remove') 
    let queryParams = {
      genre: this.genres,
      sort: this.sort,
      year: this.years,
      language: this.languages,
      country: this.countriesIso,
      page: 1
    }

    this.router.navigate(['/filter'], {
      // relativeTo: this.activatedRoute,
      queryParams
    })
  }

  filterResults(genres: any, years: any, countries: any, companies: any, sort: any, languages: any, page: any, remove: any) {
    this.movieApiService.getFilter(genres, years, countries, companies, sort, languages, page)
        .subscribe(result => {
          this.watchlistService.watchlistAsObservable().subscribe(watchlist => {
            this.searchRes$ = this.watchlistService.filterWatchlist(watchlist, result.results)
          })
          this.pages = []
          this.totalResults = result.total_results
          this.totalPages = result.total_pages > 500 ? 500 : result.total_pages
          for (let i = parseInt(page) - 3; i < parseInt(page) + 4; i++) {
            if (i > 0 && i < this.totalPages) {
              this.pages.push(i)
            }

          }
        });
  }

}
