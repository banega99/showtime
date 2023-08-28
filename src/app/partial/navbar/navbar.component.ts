import { Component, ElementRef, HostListener, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, mergeMap } from 'rxjs';
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
  @ViewChild('l') line!: ElementRef
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
      this.movieApiService.getMovieBytitle(title, 1).pipe(mergeMap(movies => {
        return this.movieApiService.getActor(title, 1).pipe(map(actors => {
          this.searchResults = movies.results.length > 0 && actors.results.length > 0 && movies.results.slice(0, 2).concat(actors.results.slice(0, 2)) ||
            movies.results.length == 0 && actors.results && actors.results.slice(0, 4) ||
            movies.results && actors.results.length == 0 && movies.results.slice(0, 4)
        }))

      })).subscribe()
    } else if (this.searchType == 'Movie') {
      this.movieApiService.getMovieBytitle(title, 1).subscribe(data => {
        this.searchResults  = data.results.slice(0, 4)
      })

    } else if (this.searchType == 'People') {
      this.movieApiService.getActor(title, 1).subscribe(data => {
        this.searchResults = data.results.slice(0, 4).filter((data: any) => data.popularity > 0.6)
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
