import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, find, map } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchRes$!: any[]
  searchActors$!: any[]
  resLength!: number
  actorImgUrl!: string
  type!: string
  constructor(private activatedRoute: ActivatedRoute, private movieApiService: MovieApiService) {
    

    

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.type == 'All') {
        this.type = params.type
        this.movieApiService.getMovieBytitle(params.title).subscribe(console.log)
        this.movieApiService.getMovieBytitle(params.title).subscribe(res => this.searchRes$ = res.results)
        this.movieApiService.getActor(params.title).subscribe(console.log)
        this.movieApiService.getActor(params.title)
        .subscribe(res => this.searchActors$ = res.results.filter((actor:any) => actor.popularity > 0.6))
      }
      else if (params.type == 'Movie') {
        this.type = params.type
        this.movieApiService.getMovieBytitle(params.itle).subscribe(console.log)
        this.movieApiService.getMovieBytitle(params.title).subscribe(res => this.searchRes$ = res.results)
      }
      else if (params.type == 'Actor') {
        this.type = params.type
        this.movieApiService.getActor(params.itle).subscribe(console.log)
        this.movieApiService.getActor(params.title)
        .subscribe(res => this.searchActors$ = res.results.filter((actor:any) => actor.popularity > 0.6))
      }

      this.movieApiService.getMovieBytitle(params.movieTitle).subscribe(res => this.resLength = res.results.length)
    })
    
  }
}
