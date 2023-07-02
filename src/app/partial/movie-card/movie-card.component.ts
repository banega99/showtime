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
  
}
