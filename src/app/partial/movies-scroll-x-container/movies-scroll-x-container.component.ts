import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-scroll-x-container',
  templateUrl: './movies-scroll-x-container.component.html',
  styleUrls: ['./movies-scroll-x-container.component.css']
})
export class MoviesScrollXContainerComponent implements OnInit {
  @Input() title!: string
  @Input() movies!: any[]
  @Input() width!: string
  windowWidth!: number
  movieList!: string

  ngOnInit(): void {
    this.windowWidth = window.innerWidth
    this.movieList = this.makeMovieList()
    // console.log(this.movieList)
  }

  scrollX(e: any) {
    e.preventDefault();
    e.target.closest('.rowposter').scrollBy({
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
    // console.log(moviesIndex)
    let movieList = titleArr.toSpliced(moviesIndex, 1).join('_')
    // console.log(movieList)
    return movieList.toLowerCase()
  }

}
