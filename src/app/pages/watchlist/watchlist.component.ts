import { Component } from '@angular/core';
import { WatchlistService } from 'src/app/services/watchlist-service/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent {
  movies: string[] = []
  constructor(private watchlistService: WatchlistService){
    this.watchlistService.watchlistAsObservable().subscribe(watchlist=>{
      if(!watchlist)return
      this.movies = watchlist
    })
  }
}
