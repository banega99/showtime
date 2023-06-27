import { Component, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  title = 'showtime';
  genres!: any[]
  countries!: any[]
  navbg: any
  searchForm!: FormGroup
  searchResults: any[] = []
  movieResults: any[] = []
  actorResults: any[] = []
  years: number[] = []
  genreValue: number[] = []
  yearValue: number[] = []
  statusValue = []
  countriesValue: string[] = []
  sortValue!: string
  searchType: string = 'All'
  @ViewChild('s') searchInput!: ElementRef
  @ViewChildren('inputCheckbox') inputCheckbox!: QueryList<ElementRef>
  constructor(private route: Router, private movieApiService: MovieApiService, private fb: FormBuilder){
    this.movieApiService.getGenres().subscribe(genres => this.genres = genres.genres)
    movieApiService.getAllCountries().subscribe(data => {
      this.countries = data.slice(1, data.length - 1)
    })
    for (let i = 1900; i < new Date().getFullYear()+ 1; i++) {
      this.years.push(i)
  }
  
  }
  
  ngOnInit(): void {
    
    this.searchForm = this.fb.group({
      searchTerm: ['',[Validators.required]]
    })
  }

  resetInputValue(e: any){
    console.log(this.searchInput.nativeElement.value, e.target)
    this.searchInput.nativeElement.value = ''
  }

  get fc(){
    return this.searchForm.controls
  }
  // @HostListener('document:scroll') scrollover(){
  //   if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0){
  //     this.navbg = {
  //       'background-color': '#000000'
  //     }
  //   } else {
  //     this.navbg = {
  //       'background-color': '#000000'
  //     }
  //   }
  // }

  search(e: Event, searchTerm: string){
    e.preventDefault()
    // if(this.fc.searchTerm.touched && this.fc.searchTerm.invalid){
    //   document.querySelector('.error-container')?.classList.add('show-error')
    // }
    if(searchTerm == '') {
      document.querySelector('.error-container')?.classList.add('show-error')
      return
    }
    this.searchInput.nativeElement.value = ''
    this.route.navigateByUrl(`search/${this.searchType}/${searchTerm}`)
    document.querySelector('.navbar-collapse')?.classList.remove('show')
  }

  showResults(title: string){
    console.log(title);
    
    if(title == '') return
    if(this.searchType == 'All'){
      // this.searchResults = []
      this.movieApiService.getMovieBytitle(title).subscribe(data => {
        // this.searchResults.push(data.results.slice(0, 2))
        this.movieResults = data.results.slice(0, 2)
        // console.log(data.results.slice(0, 2));
        
      })
      this.movieApiService.getActor(title).subscribe(data => {
        // this.searchResults.push(data.results.slice(0, 2))
        this.actorResults = data.results.slice(0, 2).filter((data:any) => data.popularity > 0.6)
        // console.log(data.results.slice(0, 2));
      })
      this.searchResults = this.movieResults.concat(this.actorResults)
      // console.log(this.searchResults)
    } else if(this.searchType == 'Movie'){
      this.movieApiService.getMovieBytitle(title).subscribe(data => {
        // this.searchResults.push(data.results.slice(0, 2))
        this.movieResults = data.results.slice(0, 4)
        // console.log(data.results.slice(0, 2));
        
      })
      this.searchResults = this.movieResults
    } else if(this.searchType == 'Actor'){
      this.movieApiService.getActor(title).subscribe(data => {
        // this.searchResults.push(data.results.slice(0, 2))
        this.actorResults = data.results.slice(0, 4).filter((data:any) => data.popularity > 0.6)
        // console.log(data.results.slice(0, 4));
      })
      this.searchResults = this.actorResults
      // console.log(this.searchResults)
    }
    
    this.movieApiService.getMovieBytitle(title).pipe(map(data => data.results.slice(0, 4))).subscribe(console.log)
  }

  hideError(){
    document.querySelector('.navbar-collapse')?.classList.remove('show')
  }

  checkboxValue(e: any){
    if(e.target?.checked){
      if(e.target.classList.contains('genre-input')){
      console.log(e.target)
      this.genreValue.push(e.target?.value)
      console.log(this.genreValue)
    } else if (e.target.classList.contains('year-input')){
      console.log(e.target)
      this.yearValue.push(e.target?.value)
      console.log(this.yearValue)
    } 
    else if (e.target.classList.contains('countries-input')){
      console.log(e.target)
      this.countriesValue.push(e.target?.value)
      console.log(this.countriesValue)
    } else if(e.target.classList.contains('radio-input')){
      console.log(e.target)
      this.sortValue = e.target?.value
      console.log(this.sortValue)
    }
    } else {
      if(e.target.classList.contains('genre-input')){
        let index = this.genreValue.indexOf(e.target?.value)
      this.genreValue.splice(index, 1)
      console.log(this.genreValue)
      } else if(e.target.classList.contains('year-input')){
        let index = this.yearValue.indexOf(e.target?.value)
      this.yearValue.splice(index, 1)
      console.log(this.yearValue)
      }
      if(e.target.classList.contains('countries-input')){
        let index = this.countriesValue.indexOf(e.target?.value)
      this.countriesValue.splice(index, 1)
      console.log(this.countriesValue)
      }else if(e.target.classList.contains('radio-input')){
        console.log(e.target)
        this.sortValue = ''
        console.log(this.sortValue)
      }
    }
      
    }    

    filter(){
      if(this.genreValue.length == 0 && this.yearValue.length == 0 && this.countriesValue.length == 0 && !this.sortValue) return 
      let genres = this.genreValue.length > 0 ? this.genreValue : ' '
      let years = this.yearValue.length > 0 ? this.yearValue : ' '
      let countries = this.countriesValue.length > 0 ? this.countriesValue : ' '
      let sort = this.sortValue != '' ? this.sortValue : ' '
      // if(!this.sortValue) return 
      this.route.navigateByUrl(`/filter/${genres}/${years}/${countries}/${sort}`)
    }

    resetFilter(){
      let checkboxInputs = document.getElementsByClassName('checkbox-input')
      for (let i = 0; i < checkboxInputs.length; i++) {
        const element = checkboxInputs[i] as HTMLInputElement;
        if(element.checked)element.checked = false
      }
      this.genreValue = []
      this.yearValue = []
      this.countriesValue = []
    }

    showFilter(f: any, fb: any, a: any) {
      let attributeSrc = a.getAttribute('src')
      f.classList.contains('filter-show')? f.classList.remove('filter-show') : f.classList.add('filter-show')
      fb.classList.contains('guide-move')? fb.classList.remove('guide-move') : fb.classList.add('guide-move')
      if(attributeSrc == '../../../assets/images/guideWhite_left.png')a.setAttribute('src', '../../../assets/images/guideWhite_right.png')
      else if(attributeSrc == '../../../assets/images/guideWhite_right.png')a.setAttribute('src', '../../../assets/images/guideWhite_left.png')
    }
    
    changeSearchType(value:  HTMLLIElement) {
      this.searchType = value.innerText
      this.searchResults = []
    }

}
