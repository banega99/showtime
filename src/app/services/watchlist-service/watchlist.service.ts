import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService implements OnInit {
  watchlist: any[] = localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist') || '{[]}') : []
  watchlistSubject$ = new BehaviorSubject<any[]>(this.watchlist)
  watchlistObservable$!: Observable<any[]>

  constructor(private toast: ToastrService, private router: Router) { }
  ngOnInit(): void {
    this.watchlistSubject$.next(this.watchlist)
    this.watchlistObservable$ = this.watchlistSubject$.asObservable()
  }
  addToWatchlist(movie: any, img: any) {
    let imgUrl = img.getAttribute('src')
    if (imgUrl == '../../../assets/images/x.png' || imgUrl == '../../../assets/images/xRed2.png') {
      let newWatchlist = this.watchlist.filter(watchlist => watchlist.id != movie.id)
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist))
      this.watchlist = JSON.parse(localStorage.getItem('watchlist') || '{[]}')
      this.watchlistSubject$.next(this.watchlist)
      this.toast.success(`Successfully removed '${movie.title}' from watchlist`)
      return
    }
    localStorage.getItem('watchlist')
    if (this.watchlist.find((watch: any) => watch.id === movie.id)) {
      this.toast.info(`'${movie.title}' already added to watchlist`)
      return
    }
    this.watchlist.push(movie);
    this.watchlistSubject$.next(this.watchlist)
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist))
    this.toast.success(`Successfully added '${movie.title}' to watchlist`)
  }

  watchlistAsObservable(): Observable<any> {
    return this.watchlistSubject$.asObservable();
  }

}
