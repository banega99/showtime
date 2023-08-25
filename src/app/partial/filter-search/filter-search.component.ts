import { query } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { MovieApiService } from 'src/app/services/movie-api-service.service';
import { NavigationRouterService } from 'src/app/services/navigation-router-service/navigation-router.service';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.css']
})
export class FilterSearchComponent {
  genres!: any[]
  countries!: any[]
  years: number[] = []
  languages!: any[]
  genreValue: number[] = []
  yearValue: number[] = []
  statusValue = []
  countriesValue: string[] = []
  languagesValue: string[] = []
  sortValue!: any
  @ViewChild('a') img!: ElementRef<any>
  constructor(private router: Router, private movieApiService: MovieApiService, private activatedRoute: ActivatedRoute, private navService: NavigationRouterService) {
    this.movieApiService.getGenres().subscribe(genres => this.genres = genres.genres)
    movieApiService.getAllCountries().subscribe(data => {
      this.countries = data
    })
    movieApiService.getAllLanguages().subscribe(data => {
      this.languages = data.slice(1, data.length - 1)
    })
    this.fillYears()
  }
  checkboxValue(e: any) {
    if (e.target?.checked) {
      this.sortValue = 'popularity.desc'
      if (e.target.classList.contains('genre-input')) {
        // console.log(e.target)
        this.genreValue.push(e.target?.value)
        // console.log(this.genreValue)
      } else if (e.target.classList.contains('year-input')) {
        // console.log(e.target)
        this.yearValue.push(e.target?.value)
        // console.log(this.yearValue)
      }
      else if (e.target.classList.contains('countries-input')) {
        // console.log(e.target)
        this.countriesValue.push(e.target?.value)
        // console.log(this.countriesValue)
      } else if (e.target.classList.contains('languages-input')) {
        // console.log(e.target)
        this.languagesValue.push(e.target?.value)
        // console.log(this.countriesValue)
      } else if (e.target.classList.contains('radio-input')) {
        // console.log(e.target)
        this.sortValue = e.target?.value
        // console.log(this.sortValue)
      }
    } else {

      if (e.target.classList.contains('genre-input')) {
        let index = this.genreValue.indexOf(e.target?.value)
        this.genreValue.splice(index, 1)
        // console.log(this.genreValue)
      } else if (e.target.classList.contains('year-input')) {
        let index = this.yearValue.indexOf(e.target?.value)
        this.yearValue.splice(index, 1)
        // console.log(this.yearValue)
      }
      else if (e.target.classList.contains('countries-input')) {
        let index = this.countriesValue.indexOf(e.target?.value)
        this.countriesValue.splice(index, 1)
        // console.log(this.countriesValue)
      } else if (e.target.classList.contains('languages-input')) {
        let index = this.languagesValue.indexOf(e.target?.value)
        this.languagesValue.splice(index, 1)
        // console.log(this.countriesValue)
      } else if (e.target.classList.contains('radio-input')) {
        // console.log(e.target)
        this.sortValue = ''
        // console.log(this.sortValue)
      }
    }
    if(this.navService.getUrl().includes('filter'))this.filter()
    // this.filter()
    // this.routesRecognized.url


  }

  filter() {
    this.navService.filter(this.genreValue, this.yearValue, this.countriesValue, this.languagesValue, this.sortValue)
  }

  resetFilter() {
    this.sortValue = undefined
    let checkboxInputs = document.getElementsByClassName('checkbox-input')
    for (let i = 0; i < checkboxInputs.length; i++) {
      const element = checkboxInputs[i] as HTMLInputElement;
      if (element.checked) element.checked = false
    }
    this.genreValue = []
    this.yearValue = []
    this.countriesValue = []
    this.languagesValue = []
  }

  showFilter(f: any, fb: any, a: any) {
    let attributeSrc = a.getAttribute('src')
    f.classList.toggle('filter-show')
    fb.classList.toggle('guide-move')
    if (attributeSrc == '../../../assets/images/guideWhite_left.png') a.setAttribute('src', '../../../assets/images/guideWhite_right.png')
    else if (attributeSrc == '../../../assets/images/guideWhite_right.png') a.setAttribute('src', '../../../assets/images/guideWhite_left.png')
  }

  fillYears() {
    for (let i = new Date().getFullYear(); i >= 1900; i--) {
      this.years.push(i)
    }
  }
}
