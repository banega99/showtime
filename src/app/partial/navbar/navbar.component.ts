import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieApiService } from 'src/app/services/movie-api-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  title = 'showtime';
  genres!: any[]
  navbg: any
  searchForm!: FormGroup
  searchResults$!: Observable<any>
  @ViewChild('s') searchInput!: ElementRef
  constructor(private route: Router, private movieApiService: MovieApiService, private fb: FormBuilder){
    this.movieApiService.getGenres().subscribe(genres => this.genres = genres.genres)
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
    this.route.navigateByUrl('search/' + searchTerm)
    document.querySelector('.navbar-collapse')?.classList.remove('show')
  }

  showResults(title: string){
    if(title == '') return
    this.searchResults$ = this.movieApiService.getMovieBytitle(title)
    this.movieApiService.getMovieBytitle(title).subscribe(console.log)
  }

  hideError(){
    document.querySelector('.navbar-collapse')?.classList.remove('show')
  }

}
