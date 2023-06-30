import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-movie-videos',
  templateUrl: './movie-videos.component.html',
  styleUrls: ['./movie-videos.component.css']
})
export class MovieVideosComponent {
  videos : any []= []
  moreVideos: any [] = []
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
  }

  hideVideos(section: any) {
    section.classList.toggle('videos-show')
  }

}
