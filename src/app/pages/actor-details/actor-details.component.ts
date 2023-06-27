import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent {
  actorDetails$!: Observable<any>
  movieCredits$!: Observable<any>
  yearsOld!: any
  constructor(private movieApiService: MovieApiService, private activatedRoute: ActivatedRoute){
    activatedRoute.params.subscribe(params =>{
      if(!params)return
      console.log(params.id);
      movieApiService.getActorDetails(params.id).subscribe(console.log)
      movieApiService.getMovieCredits(params.id).subscribe(console.log)
      this.actorDetails$ = movieApiService.getActorDetails(params.id)
      this.movieCredits$ = movieApiService.getMovieCredits(params.id).pipe(map(data => data.cast))
      movieApiService.getActorDetails(params.id).subscribe(actor => {
        this.yearsOld = new Date().getFullYear() - parseInt(actor.birthday.split('-')[0])
      })
    })
  }

  scrollX(e: any){
    e.preventDefault();
    e.target.closest('.rowposter').scrollBy({
      left: e.deltaY < 0 ? -60 : 60
    })
  }

}
