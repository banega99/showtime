import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService implements OnInit {
  watchlist: any[] = localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist') || '{[]}') : []
  watchlistSubject$ = new BehaviorSubject<any[]>(this.watchlist)
  watchlistObservable$!: Observable<any[]>

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.watchlistSubject$.next(this.watchlist)
    this.watchlistObservable$ = this.watchlistSubject$.asObservable()
  }
  addToWatchlist(movie: any, img: any) {
    let imgUrl = img.getAttribute('src')
    if (imgUrl == '../../../assets/images/x.png' || imgUrl == '../../../assets/images/xRed2.png') {
      movie.watchlist = false
      let newWatchlist = this.watchlist.filter(watchlist => watchlist.id != movie.id)
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist))
      this.watchlist = JSON.parse(localStorage.getItem('watchlist') || '{[]}')
      this.watchlistSubject$.next(this.watchlist)
      let customToast = document.querySelector('.custom-toast')
      let toastImg = document.querySelector('.toast-img')
      let toastText = document.querySelector('.toast-text') as HTMLElement
      customToast?.classList.add('show-toast')
      toastText.innerHTML = `Succesfully removed <span class="toast-span"><i> ${movie.title} </i></span>  from Watchlist!`
      toastImg?.setAttribute('src', `https://image.tmdb.org/t/p/original${movie.poster_path}`)
      setTimeout(() => {
        customToast?.classList.remove('show-toast')
      }, 1800)

      return
    }
    localStorage.getItem('watchlist')
    movie.watchlist = true
    this.watchlist.push(movie);
    this.watchlistSubject$.next(this.watchlist)
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist))
    // this.toast.success(`Successfully added '${movie.title}' to watchlist`)
    let customToast = document.querySelector('.custom-toast')
    let toastImg = document.querySelector('.toast-img')
    let toastText = document.querySelector('.toast-text') as HTMLElement
    customToast?.classList.add('show-toast')
    toastText.innerHTML = `Succesfully added <span class="toast-span"><i> ${movie.title} </i></span>  to Watchlist!`
    toastImg?.setAttribute('src', `https://image.tmdb.org/t/p/original${movie.poster_path}`)
    setTimeout(() => {
      customToast?.classList.remove('show-toast')
    }, 1800)

  }

  watchlistAsObservable(): Observable<any> {
    return this.watchlistSubject$.asObservable();
  }

  filterWatchlist(watchlist: any, results: any) {
    let watchlistRes = results.filter(({ id: id1 }: any) => {
      return watchlist.some(({ id: id2 }: any) => id1 === id2)
    })
    let filteredRes = results.filter(({ id: id1 }: any) => {
      return !watchlist.some(({ id: id2 }: any) => id1 === id2)
    })

    watchlistRes.forEach((filter: any) => filter.watchlist = true)
    filteredRes.forEach((filter: any) => filter.watchlist = false)
    return watchlistRes.concat(filteredRes).sort((a: any, b: any) => {
      if (a.popularity < b.popularity) {
        return 1
      } else if (a.popularity > b.popularity) {
        return -1
      } else return 0
    });
  }

}
