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
    // console.log(locale)
    this.activatedRoute.params.subscribe(params => {
      this.pages = []
      this.title = params.title
      this.currentPage = parseInt(params.page)
      console.log(params)
      if (params.type == 'All') {
        // this.genre = params.genre
        // this.genreId = params.id
        this.type = params.type
        this.movieApiService.getMovieBytitle(params.title, 1).subscribe(console.log)
        this.movieApiService.getMovieBytitle(params.title, 1).subscribe(res => {
          if (!res) return
          this.searchRes$ = res.results
          this.totalPages = res.total_pages > 500 ? 500 : res.total_pages
          this.totalResults = res.total_results
          for (let i = params.page - 5; i < parseInt(params.page) + 5; i++) {
            console.log(this.totalPages)

            if (i > 0 && i < this.totalPages) {
              this.pages.push(i)
              console.log(this.pages)
            }

          }
          this.searchRes$ = res.results
        })
        this.movieApiService.getActor(params.title, 1).subscribe(console.log)
        this.movieApiService.getActor(params.title, 1)
          .subscribe(res => {
            if (!res) return
            this.searchActors$ = res.results.filter((actor: any) => actor.popularity > 0.6)
          })
      }
      else if (params.type == 'Movie') {
        this.type = params.type
        this.movieApiService.getMovieBytitle(params.title, 1).subscribe(console.log)
        this.movieApiService.getMovieBytitle(params.title, 1).subscribe(res => {
          if (!res) return
          this.searchRes$ = res.results
          this.totalPages = res.total_pages > 500 ? 500 : res.total_pages
          this.totalResults = res.total_results
          for (let i = params.page - 5; i < parseInt(params.page) + 5; i++) {
            console.log(this.totalPages)

            if (i > 0 && i < this.totalPages) {
              this.pages.push(i)
              console.log(this.pages)
            }
          }})
      }
      else if (params.type == 'Actor') {
        this.type = params.type
        this.movieApiService.getActor(params.title, 1).subscribe(console.log)
        this.movieApiService.getActor(params.title, 1)
          .subscribe(res => {
            if (!res) return
            this.searchActors$ = res.results.filter((actor: any) => actor.popularity > 0.6)
          })
      }

      this.movieApiService.getMovieBytitle(params.movieTitle, 1).subscribe(res => this.resLength = res.results.length)
    })

  }
}
