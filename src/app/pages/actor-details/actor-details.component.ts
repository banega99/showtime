import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
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
    activatedRoute.params.pipe(switchMap(params =>{
      
      this.actorDetails$ = movieApiService.getActorDetails(params.id)
      let credits = movieApiService.getMovieCredits(params.id).pipe(map(data => data.cast))
      let yearsDet = movieApiService.getActorDetails(params.id).pipe(map(actor => {
        let resultsYear = parseInt(actor.birthday?.split('-')[0])
        let actorThisYear = new Date([String(new Date().getFullYear())].concat(actor.birthday.split('-').slice(1, actor.birthday.split('-').length)).join('-'))
        this.yearsOld = new Date().getFullYear() - resultsYear
        if(new Date().getTime() < actorThisYear.getTime())this.yearsOld -= 1
        if(!actor.deathday)return
        this.yearsOldDead = parseInt(actor.deathday?.split('-')[0]) - parseInt(actor.birthday?.split('-')[0])
      }))
      let imgs = movieApiService.getActorImages(params.id).pipe(map(imgs => {
        this.images = imgs.profiles
      }))
      return forkJoin(credits, yearsDet, imgs)
    })).subscribe(([credits, yearsDet, imgs]) => {
      this.movieCredits = credits
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
