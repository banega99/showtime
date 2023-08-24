import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';

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
}
