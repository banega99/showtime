import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, find, map } from 'rxjs';
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
  constructor(private activatedRoute: ActivatedRoute, private movieApiService: MovieApiService,
    private watchlistService: WatchlistService) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.pages = []
      this.title = params.title
      this.currentPage = parseInt(params.page)
      if (params.type == 'All') {
        this.type = params.type
        this.movieApiService.getMovieBytitle(params.title, params.page).subscribe(res => {
          if (!res) return
          this.watchlistService.watchlistAsObservable().subscribe(watchlist => {
            this.searchRes$ = this.watchlistService.filterWatchlist(watchlist, res.results)
          })
          this.totalPages = res.total_pages > 500 ? 500 : res.total_pages
          this.totalResults = res.total_results
          for (let i = params.page - 3; i < parseInt(params.page) + 4; i++) {
            if (i > 0 && i < this.totalPages) {
              this.pages.push(i)
            }
          }
          this.searchRes$ = res.results
        })
        this.movieApiService.getActor(params.title, params.page).subscribe(console.log)
        this.movieApiService.getActor(params.title, params.page)
          .subscribe(res => {
            if (!res) return
            this.searchActors$ = res.results.filter((actor: any) => actor.popularity > 0.6)
          })
      }
      else if (params.type == 'Movie') {
        this.type = params.type
        this.movieApiService.getMovieBytitle(params.title, params.page).subscribe(res => {
          if (!res) return
          this.watchlistService.watchlistAsObservable().subscribe(watchlist => {
            this.searchRes$ = this.watchlistService.filterWatchlist(watchlist, res.results)
          })
          this.totalPages = res.total_pages > 500 ? 500 : res.total_pages
          this.totalResults = res.total_results
          for (let i = params.page - 3; i < parseInt(params.page) + 4; i++) {
            if (i > 0 && i < this.totalPages) {
              this.pages.push(i)
            }
          }})
      }
      else if (params.type == 'Actor') {
        this.type = params.type
        this.movieApiService.getActor(params.title, params.page)
          .subscribe(res => {
            if (!res) return
            this.searchActors$ = res.results.filter((actor: any) => actor.popularity > 0.6)
          })
      }

      this.movieApiService.getMovieBytitle(params.movieTitle, 1).subscribe(res => this.resLength = res.results.length)
    })

  }
}
