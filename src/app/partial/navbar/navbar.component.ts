import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private route: Router, private movieApiService: MovieApiService, private fb: FormBuilder){
    this.movieApiService.getGenres().subscribe(genres => this.genres = genres.genres)
  }
  
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchTerm: ['',[Validators.required]]
    })
  }

  // ngOnChanges(changes: SimpleChanges){
  //   console.log(changes)
  //   // this.showError = this.fc.searchTerm.invalid && this.fc.searchTerm.touched
  // }

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
    if(searchTerm == '') return
    this.route.navigateByUrl('search/' + searchTerm)
    document.querySelector('.navbar-collapse')?.classList.remove('show')
  }

  get toggle(){
    let toggle = window.innerWidth < 992 ? document.querySelector('.navbar-collapse')?.classList.contains('show') : true
    return toggle
  }
}
