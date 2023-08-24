import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataResolveService implements Resolve<any> {

  constructor(private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {

    let pathFromRoot = route.pathFromRoot;

    // you can compare pathFromRoot with your route to return different data

    return Promise.resolve({
        cockpit1 : false,
        cockpit2 : true,
        kpi : true
    });

  }
}
