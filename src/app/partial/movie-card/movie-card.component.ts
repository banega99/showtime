import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { WatchlistService } from 'src/app/services/watchlist-service/watchlist.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input()type!: string
  @Input()title!: string
  @Input()searchRes$: any = []
  @Input()actors!: any
  @Input()onWatchlist: boolean = false
  @Input()filter: boolean = false
  @Input()visible: boolean = false
  @Input()totalRes: number = 0
  checked: boolean = false
  
  constructor(private router: Router, private watchlistService: WatchlistService){
  }
  ngOnInit(): void {
    
  }

  route(e: any, movie:any){
    if(e.target.closest('.watchlist'))return
    this.router.navigateByUrl(`/movie/${movie.id}`)
  }

  addToWatchlist(movie:any, imgUrl: any){
    this.watchlistService.addToWatchlist(movie, imgUrl)
  }

  showPopover(popover: any){
    popover.classList.add('show-popover')
  }

  hidePopover(popover: any){
    popover.classList.remove('show-popover')
  }

  sort(e: any){
    console.log(this.searchRes$)
    switch(e.target.value){
      case '1': this.searchRes$.sort((a: any,b: any) => {
        if(a.popularity > b.popularity) return -1
        else if(a.popularity < b.popularity) return 1
        else return 0
      })
      break;
      case '2': this.searchRes$.sort((a: any,b: any) => {
        if(a.popularity < b.popularity) return -1
        else if(a.popularity > b.popularity) return 1
        else return 0
      })
      break;
      case '3': this.searchRes$.sort((a: any,b: any) => {
        if(a.vote_average > b.vote_average) return -1
        else if(a.vote_average < b.vote_average) return 1
        else return 0
      })
      break;
      case '4': this.searchRes$.sort((a: any,b: any) => {
        if(a.vote_average < b.vote_average) return -1
        else if(a.vote_average > b.vote_average) return 1
        else return 0
      })
      break;
      case '5': this.searchRes$.sort((a: any,b: any) => {
        if(a.title < b.title) return -1
        else if(a.title > b.title) return 1
        else return 0
      })
      break;
      case '6': this.searchRes$.sort((a: any,b: any) => {
        if(a.title > b.title) return -1
        else if(a.title < b.title) return 1
        else return 0
      })
      break;
    }
  }
  
}
