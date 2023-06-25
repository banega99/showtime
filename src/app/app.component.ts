import { Component, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiService } from './services/movie-api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarComponent } from './partial/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges{
  @ViewChild('navbar') navbar!: NavbarComponent
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  @HostListener('document:click', ['$event'])
    onClick(ev: PointerEvent) {
      
      let target = ev.target as Element
      if(document.querySelector('.search-dropdown')?.classList.contains('search-show')){
        document.querySelector('.search-dropdown')?.classList.remove('search-show')
      }
      if (target.classList.contains('btn') || target.classList.contains('form-control')) return
      this.navbar.searchInput.nativeElement.value = ''
      if(document.querySelector('.error-container')?.classList.contains('show-error')){
        document.querySelector('.error-container')?.classList.remove('show-error')
      }
      
     }
}
