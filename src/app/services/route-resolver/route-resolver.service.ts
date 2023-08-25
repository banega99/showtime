import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { NEVER, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteResolverService implements Resolve<any> {

  private previousUrl!: string;

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if (this.refresh(state.url)) {
      this.previousUrl = state.url;
    }
    this.previousUrl = state.url;
    return NEVER
  }

  private refresh(currentUrl: string): boolean {
    return !this.previousUrl || this.previousUrl === currentUrl;
  }

}
