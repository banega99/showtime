import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, find, forkJoin, map, of, switchMap, tap } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';
import { WatchlistService } from 'src/app/services/watchlist-service/watchlist.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchRes$: any[] = []
  searchActors$: any[] = []
  resLength!: number
  actorImgUrl!: string
  type!: string
  title!: string
  genre!: string
  genreId!: string
  pages: any[] = []
  currentPage!: any
  totalPages!: number
  totalResults!: number
  actorsTotalRes!: number
  constructor(private activatedRoute: ActivatedRoute, private movieApiService: MovieApiService,
    private watchlistService: WatchlistService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(switchMap(params => {
      console.log(params)
      if (!params) return of(null);
      // let resLengthObs = this.movieApiService.getMovieBytitle(params.movieTitle, 1).pipe(tap(res => this.resLength = res.results.length))
      this.pages = []
      this.title = params.title
      this.currentPage = parseInt(params.page)
      this.type = params.type
      if (params.type == 'All') {
        let moviesObs = this.movieApiService.getMovieBytitle(params.title, params.page).pipe(switchMap(res => {
          this.totalPages = res.total_pages > 500 ? 500 : res.total_pages
          this.totalResults = res.total_results
          console.log(res)
          for (let i = params.page - 3; i < parseInt(params.page) + 4; i++) {
            if (i > 0 && i < this.totalPages) {
              this.pages.push(i)
            }
          }
          return this.watchlistService.watchlistAsObservable().pipe(tap(watchlist => {

            this.searchRes$ = this.watchlistService.filterWatchlist(watchlist, res.results)
            console.log(this.searchRes$)
          }))
        }))
        let actorsObs = this.movieApiService.getActor(params.title, params.page)
          .pipe(tap(res => {
            this.searchActors$ = res.results
            this.actorsTotalRes = res.total_results
          }))
        return forkJoin(moviesObs, actorsObs)
      } else if (params.type == 'Movie') {
        let moviesObs = this.movieApiService.getMovieBytitle(params.title, params.page).pipe(switchMap(res => {
          this.totalPages = res.total_pages > 500 ? 500 : res.total_pages
          this.totalResults = res.total_results
          console.log(res)
          for (let i = params.page - 3; i < parseInt(params.page) + 4; i++) {
            if (i > 0 && i < this.totalPages) {
              this.pages.push(i)
            }
          }
          return this.watchlistService.watchlistAsObservable().pipe(tap(watchlist => {

            this.searchRes$ = this.watchlistService.filterWatchlist(watchlist, res.results)
            console.log(this.searchRes$)
          }))
        }))
        return moviesObs
      } else if (params.type === 'People') {
        let actorsObs = this.movieApiService.getActor(params.title, params.page)
          .pipe(tap(res => {
            this.searchActors$ = res.results
            this.actorsTotalRes = res.total_results
            this.totalPages = res.total_pages > 500 ? 500 : res.total_pages
            this.totalResults = res.total_results
            for (let i = params.page - 3; i < parseInt(params.page) + 4; i++) {
              if (i > 0 && i < this.totalPages) {
                this.pages.push(i)
              }
            }
          }))
        return actorsObs
      }

      return EMPTY

    })).subscribe()

  }
}
