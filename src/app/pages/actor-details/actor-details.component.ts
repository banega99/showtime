import { Component, OnDestroy } from '@angular/core';
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
  movieCredits!: any
  yearsOld!: any
  yearsOldDead!: any
  images!: any
  constructor(private movieApiService: MovieApiService, private activatedRoute: ActivatedRoute){
    activatedRoute.params.subscribe(params =>{
      if(!params)return
      this.actorDetails$ = movieApiService.getActorDetails(params.id)
      movieApiService.getActorDetails(params.id).subscribe(console.log)
      movieApiService.getMovieCredits(params.id).pipe(map(data => data.cast))
      .subscribe(res => {
        this.movieCredits = res
        console.log(res)
      })
      movieApiService.getActorDetails(params.id).subscribe(actor => {
        this.yearsOld = new Date().getFullYear() - parseInt(actor.birthday?.split('-')[0])
        if(!actor.deathday)return
        this.yearsOldDead = parseInt(actor.deathday?.split('-')[0]) - parseInt(actor.birthday?.split('-')[0])
      })
      movieApiService.getActorImages(params.id).subscribe(imgs => {
        // console.log(imgs.profiles);
        this.images = imgs.profiles
      })
    })
  }

  showGallery() {
    if(this.images.length == 0) return
    let gallery = document.querySelector('.carousel') as HTMLElement
    let blur = document.querySelector('.blur') as HTMLElement
    gallery.classList.toggle('carousel-show')
    blur.classList.toggle('blur-show')
    document.documentElement.style.overflow = 'hidden'
  }

}
