import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.css']
})
export class FilterSearchComponent {
  genres!: any[]
  countries!: any[]
  years: number[] = []
  genreValue: number[] = []
  yearValue: number[] = []
  statusValue = []
  countriesValue: string[] = []
  sortValue!: any
  @ViewChild('a')img!: ElementRef<any>
  constructor(private router: Router, private movieApiService: MovieApiService){
    this.movieApiService.getGenres().subscribe(genres => this.genres = genres.genres)
    movieApiService.getAllCountries().subscribe(data => {
      this.countries = data.slice(1, data.length - 1)
    })
    for (let i = 1900; i < new Date().getFullYear() + 1; i++) {
      this.years.push(i)
    }
  }
  checkboxValue(e: any){
    if(e.target?.checked){
      this.sortValue = 'popularity.desc'
      if(e.target.classList.contains('genre-input')){
      // console.log(e.target)
      this.genreValue.push(e.target?.value)
      // console.log(this.genreValue)
    } else if (e.target.classList.contains('year-input')){
      // console.log(e.target)
      this.yearValue.push(e.target?.value)
      // console.log(this.yearValue)
    } 
    else if (e.target.classList.contains('countries-input')){
      // console.log(e.target)
      this.countriesValue.push(e.target?.value)
      // console.log(this.countriesValue)
    } else if(e.target.classList.contains('radio-input')){
      // console.log(e.target)
      this.sortValue = e.target?.value
      // console.log(this.sortValue)
    }
    } else {
      
      if(e.target.classList.contains('genre-input')){
        let index = this.genreValue.indexOf(e.target?.value)
      this.genreValue.splice(index, 1)
      // console.log(this.genreValue)
      } else if(e.target.classList.contains('year-input')){
        let index = this.yearValue.indexOf(e.target?.value)
      this.yearValue.splice(index, 1)
      // console.log(this.yearValue)
      }
      if(e.target.classList.contains('countries-input')){
        let index = this.countriesValue.indexOf(e.target?.value)
      this.countriesValue.splice(index, 1)
      // console.log(this.countriesValue)
      }else if(e.target.classList.contains('radio-input')){
        // console.log(e.target)
        this.sortValue = ''
        // console.log(this.sortValue)
      }
    }
      
    }    

    filter(){
      if(this.genreValue.length == 0 && this.yearValue.length == 0 && this.countriesValue.length == 0 && !this.sortValue) {
        this.sortValue = undefined
        return 
      }
      let genres = this.genreValue.length > 0 ? this.genreValue : ' '
      let years = this.yearValue.length > 0 ? this.yearValue : ' '
      let countries = this.countriesValue.length > 0 ? this.countriesValue : ' '
      let sort = this.sortValue != '' ? this.sortValue : ' '
      this.router.navigateByUrl(`/filter/${genres}/${years}/${countries}/${sort}/1`)
    }

    resetFilter(){
      this.sortValue = undefined
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
      f.classList.toggle('filter-show')
      fb.classList.toggle('guide-move')
      if(attributeSrc == '../../../assets/images/guideWhite_left.png')a.setAttribute('src', '../../../assets/images/guideWhite_right.png')
      else if(attributeSrc == '../../../assets/images/guideWhite_right.png')a.setAttribute('src', '../../../assets/images/guideWhite_left.png')
    }
    
}
