import { Component, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiService } from './services/movie-api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarComponent } from './partial/navbar/navbar.component';
import { FilterComponent } from './pages/filter/filter.component';
import { FilterSearchComponent } from './partial/filter-search/filter-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges{
  @ViewChild('navbar') navbar!: NavbarComponent
  @ViewChild('filter') filter!: FilterSearchComponent
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  @HostListener('document:click', ['$event'])
    onClick(ev: PointerEvent) {
      let target = ev.target as Element
      let guide = target.closest('#guide') ? true : false
      if(target.closest('.filter') || guide)return
      else if(document.querySelector('.filter')?.classList.contains('filter-show')){
        document.querySelector('.filter')?.classList.remove('filter-show')
        this.filter.img.nativeElement.setAttribute('src', '../../../assets/images/guideWhite_left.png')
      }
      
      if(document.querySelector('.search-dropdown')?.classList.contains('search-show')){
        document.querySelector('.search-dropdown')?.classList.remove('search-show')
      }
      if (target.classList.contains('btn') || target.classList.contains('form-control')) return
      this.navbar.searchInput.nativeElement.value = ''
      if(document.querySelector('.error-container')?.classList.contains('show-error')){
        document.querySelector('.error-container')?.classList.remove('show-error')
      }
      // if(target.closest('.videos') || target.closest('trailer'))return
      else if (document.querySelector('.videos')?.classList.contains('videos-show') && !target.closest('.trailer')){
        document.querySelector('.videos')?.classList.remove('videos-show')
      }
      
     }

}
