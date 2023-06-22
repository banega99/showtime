import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  movies!: any[]; 
  id!: string
  genre!: string
  constructor(private activatedRoute: ActivatedRoute, private movieApiService: MovieApiService, private http: HttpClient) {
    activatedRoute.params.subscribe(params => {
      if(!params) return
      this.movieApiService.fetchGenre(params.id).subscribe(result => this.movies = result.results)
      this.genre = params.genre
    })

  }

  ngOnInit(): void {

  }

}
