import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-movie-videos',
  templateUrl: './movie-videos.component.html',
  styleUrls: ['./movie-videos.component.css']
})
export class MovieVideosComponent {
  videos: any[] = []
  moreVideos: any[] = []
  constructor(private movieApiService: MovieApiService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      if (!params) return
      this.videos = []
      this.moreVideos = []
      this.movieApiService.getMovieVideo(params.id).subscribe(videos => {
        console.log(videos)
        videos.results.slice(0, 4).forEach((element: any) => {
          let url = `https://www.themoviedb.org/video/play?key=${element?.key}`
          this.videos.push(url)
        });
        videos.results.slice(0, 9).forEach((element: any) => {
          let url = `https://www.themoviedb.org/video/play?key=${element?.key}`
          this.moreVideos.push(url)
        });
      })
    })
  }
  showVideos(section: any) {
    section.classList.toggle('videos-show')
    document.querySelector('.blur')?.classList.toggle('blur-show')
    document.documentElement.style.overflow = 'hidden'
    let trailerCont = document.querySelector('.trailer-cont') as HTMLElement

    trailerCont.style.visibility = 'hidden'
    trailerCont.style.opacity = '0'
    if (window.innerWidth < 768) {
      console.log('')
      let x2 = document.querySelector('.x2') as HTMLElement
      x2.style.visibility = 'visible'
      x2.style.opacity = '1'
    }

  }

  hideVideos(section: any) {
    section.classList.toggle('videos-show')
    document.querySelector('.blur')?.classList.toggle('blur-show')
    document.documentElement.style.overflow = 'auto'
    let trailerCont = document.querySelector('.trailer-cont') as HTMLElement
    let x2 = document.querySelector('.x2') as HTMLElement
    trailerCont.style.visibility = 'visible'
    trailerCont.style.opacity = '1'
    x2.style.visibility = 'hidden'
    x2.style.opacity = '0'
  }

}
