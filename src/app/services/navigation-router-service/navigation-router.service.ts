import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationRouterService {
  url!: string
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if(event instanceof RoutesRecognized){
        this.url = event.url
      }
    })
   }
   public getUrl(): string {
    return this.url
   }

   filter(genreValue: any, yearValue: any, countriesValue: any, languagesValue: any, sortValue: any) {
    if (genreValue.length == 0 && yearValue.length == 0 && countriesValue.length == 0 && languagesValue.length == 0 && !sortValue) {
      sortValue = undefined
      return
    }
    console.log('radi')
    this.router.navigate(['/filter'], {
      queryParams: {
        genre: genreValue,
        sort: sortValue,
        year: yearValue,
        language: languagesValue,
        country: countriesValue,
        page: 1
      }
    })
  
  }
}
