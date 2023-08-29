import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable, Subscription, catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { MovieApiService } from 'src/app/services/movie-api-service.service';
import { NavigationRouterService } from 'src/app/services/navigation-router-service/navigation-router.service';
import { WatchlistService } from 'src/app/services/watchlist-service/watchlist.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
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
  companyName: any = ''
  companyId!: any
  constructor(private movieApiService: MovieApiService,
    private activatedRoute: ActivatedRoute,
    private watchlistService: WatchlistService,
    private navService: NavigationRouterService,
    private router: Router,) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(switchMap(params => {
      if (!params) return of(null);
      let company = params.company ? params.company : '';
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
      this.genres = params.genre && typeof (params?.genre) === 'string' && [params.genre] ||
        params.genre && typeof (params?.genre) === 'object' && params.genre || []
      this.countries = params.country && typeof (params?.country) === 'string' && [params.country] ||
        params.country && typeof (params?.country) === 'object' && params.country || []
      this.languages = params.language && typeof (params?.language) === 'string' && [params.language] ||
        params.language && typeof (params?.language) === 'object' && params.language || []
      this.years = !params.year || params?.year.length == 0 ? [] : params?.year
      this.years = typeof (params?.year) === 'string' ? [this.years] : this.years
      this.sortedBy = params?.sortedBy == ' ' ? '/' : this.sorted(params?.sort.split('.')[0], params?.sort.split('.')[1])
      let resObs = this.filterResults(params?.genre, params?.year, params?.country, params?.company, params?.sort, params?.language, params?.page)
      let companyObs = company && this.movieApiService.getCompany(company)
      .pipe(tap(res => {
        this.companyId = res.id
        this.companyName = res.name
      })) || of('')
      let genresObs = this.genres.length > 0 && this.genres?.map((genre: any) => {
        return this.movieApiService.getGenres()
          .pipe(
            map(res => res.genres.filter((res: any) => res.id == genre)),
            tap((res: any) => {
              if (!res[0]) return
              this.genresNames.push(res[0])
            })
          )
      }) || of([])
    
      let countriesObs = this.countries.length > 0 && this.countries?.map((country: any) => {
        return this.movieApiService.getAllCountries()
          .pipe(
            map(res => res.filter((res: any) => res.iso_3166_1 == country)),
            tap((res: any) => {
              if (!res[0]) return
              this.countriesNames.push(res[0])
            })
          )
      }) || of([])
      
      let languagesObs = this.languages.length > 0 && this.languages?.map((language: any) => {
        return this.movieApiService.getAllLanguages()
          .pipe(
            map(res => res.filter((res: any) => res.iso_639_1 == language)),
            tap((res: any) => {
              if (!res[0]) return
              this.languagesNames.push(res[0])
            })
          )
      }) || of([])
      
      return forkJoin(companyObs, resObs, forkJoin(genresObs), forkJoin(countriesObs), forkJoin(languagesObs))
    })).subscribe()
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
    this.filterResults(this.genres, this.years, this.countriesIso, '', this.sort, this.languages, 1).subscribe()
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

  filterResults(genres: any, years: any, countries: any, companies: any, sort: any, languages: any, page: any) {
    return this.movieApiService.getFilter(genres, years, countries, companies, sort, languages, page)
      .pipe(switchMap(result => {
        this.pages = []
        this.totalResults = result.total_results
        this.totalPages = result.total_pages > 500 ? 500 : result.total_pages
        for (let i = parseInt(page) - 3; i < parseInt(page) + 4; i++) {
          if (i > 0 && i < this.totalPages) {
            this.pages.push(i)
          }

        }
        return this.watchlistService.watchlistAsObservable().pipe(tap(watchlist => {
          this.searchRes$ = this.watchlistService.filterWatchlist(watchlist, result.results)
        }))
      }))
  }

}
