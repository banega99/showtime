import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'showtime';
  genres!: any[]
  navbg: any
  searchForm!: FormGroup
  searchResults: any[] = []
  movieResults: any[] = []
  actorResults: any[] = []
  searchType: string = 'All'
  @ViewChild('l')line!: ElementRef
  @ViewChild('s') searchInput!: ElementRef
  @ViewChildren('inputCheckbox') inputCheckbox!: QueryList<ElementRef>
  constructor(private route: Router, private movieApiService: MovieApiService, private fb: FormBuilder) {
    this.movieApiService.getGenres().subscribe(genres => this.genres = genres.genres)
    
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchTerm: ['', [Validators.required]]
    })
  }

  resetInputValue(e: any) {
    this.searchInput.nativeElement.value = ''
  }

  get fc() {
    return this.searchForm.controls
  }


  search(e: Event, searchTerm: string) {
    e.preventDefault()
    document.querySelector('form')?.classList.add('form-expand')
    if (searchTerm == '') {
      document.querySelector('.error-container')?.classList.add('show-error')
      return
    }
    this.searchInput.nativeElement.value = ''
    this.route.navigateByUrl(`search/${this.searchType}/${searchTerm}/1`)
    document.querySelector('.navbar-collapse')?.classList.remove('show')
  }

  showResults(title: string) {
    if (title == '') {
      this.searchResults = []
      return
    }
    if (this.searchType == 'All') {
      this.movieApiService.getMovieBytitle(title, 1).subscribe(data => {
        this.movieResults = data.results.slice(0, 2)
      })
      this.movieApiService.getActor(title, 1).subscribe(data => {
        this.actorResults = data.results.filter((data: any) => data.popularity > 0.6).slice(0, 2)
        this.searchResults = this.movieResults.concat(this.actorResults) 
      })
    } else if (this.searchType == 'Movie') {
      this.movieApiService.getMovieBytitle(title, 1).subscribe(data => {
        this.movieResults = data.results.slice(0, 4)
        this.searchResults = this.movieResults
      })
      
    } else if (this.searchType == 'Actor') {
      this.movieApiService.getActor(title, 1).subscribe(data => {
        this.actorResults = data.results.slice(0, 4).filter((data: any) => data.popularity > 0.6)
        this.searchResults = this.actorResults
      })
      
    }
  }

  hideError() {
    document.querySelector('.navbar-collapse')?.classList.remove('show')
  }

  changeSearchType(value: HTMLLIElement) {
    this.searchType = value.innerText
    this.searchResults = []
  }
  i = 0
  @HostListener('window:scroll', ['$event'])
    onScroll(e: any) {
      var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      this.line.nativeElement.style.width = scrolled + "%";
    }


}
