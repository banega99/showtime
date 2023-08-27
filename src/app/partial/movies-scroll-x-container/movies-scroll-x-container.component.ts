import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MovieApiService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-movies-scroll-x-container',
  templateUrl: './movies-scroll-x-container.component.html',
  styleUrls: ['./movies-scroll-x-container.component.css']
})
export class MoviesScrollXContainerComponent implements OnChanges, OnInit{
  constructor(private movieApiService: MovieApiService){
    // console.log(this.movies)
  }
  @Input() title!: string
  @Input() movies!: any[]
  @Input() width!: string
  windowWidth!: number
  movieList!: string

  ngOnChanges(changes: SimpleChanges): void {
    this.movies?.forEach((movie: any) => {
        this.movieApiService.getGenres().subscribe((genre: any) => {
          let filteredGenres = genre.genres.filter(({id: id1}: any) => {
            return movie.genre_ids.some((id2: any) => id1 === id2)
          })
          movie.genre_names = filteredGenres
        });
      })
  }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth
    this.movieList = this.makeMovieList()
  }

  scrollX(e: WheelEvent) {
    e.preventDefault();
    let target = e.target as HTMLElement;
    target.closest('.rowposter')?.scrollBy({
      left: e.deltaY < 0 ? -60 : 60
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(ev: PointerEvent) {
    this.windowWidth = window.innerWidth
  }

  makeMovieList() {
    let titleArr: any = this.title.split(' ')
    let moviesIndex = titleArr.indexOf('Movies')
    let movieList = titleArr.toSpliced(moviesIndex, 1).join('_')
    return movieList.toLowerCase()
  }

}
