import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
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
    if (this.watchlist.find((watch: any) => watch.id === movie.id)) {
      let customToast = document.querySelector('.custom-toast')
      let toastImg = document.querySelector('.toast-img')
      let toastText = document.querySelector('.toast-text') as HTMLElement
      customToast?.classList.add('show-toast', 'toast-info-custom')
      toastText.innerHTML = `Already added <span class="toast-span"><i> ${movie.title} </i></span>  to Watchlist!`
      toastImg?.setAttribute('src', `https://image.tmdb.org/t/p/original${movie.poster_path}`)
      setTimeout(() => {
        customToast?.classList.remove('show-toast', 'toast-info-custom')
      }, 1800)
      return
    }
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

}
