import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  constructor() { }

  hideLoading(){
    this.isLoadingSubject.next(false)
  }
  showLoading(){
    this.isLoadingSubject.next(true)
  }

  get isLoading(){
    return this.isLoadingSubject.asObservable()
  }
}
