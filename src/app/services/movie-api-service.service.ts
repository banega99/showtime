import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService{

  constructor(private http:HttpClient) {
    // this.test().subscribe(console.log)
   }

  baseUrl = "https://api.themoviedb.org/3"
  apiKey = "08cc33bd5ae3a747598ce2ad84376e66"

  bannerApi = `${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}`

  bannerApiData(): Observable<any>{
    return this.http.get(`${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}`)
  }

  trendingApiData(): Observable<any>{
    return this.http.get(`${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}`)
  }

  getMovieBytitle(title: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${title}`)
  }

  getMovieDetails(data: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${data}?api_key=${this.apiKey}`)
  }

  getMovieVideo(data: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${data}/videos?api_key=${this.apiKey}`)
  }

    // getMovieCast
    getMovieCast(data: any): Observable<any> {
      return this.http.get(`${this.baseUrl}/movie/${data}/credits?api_key=${this.apiKey}`)
    }
    // action 
    fetchActionMovies(): Observable<any> {
      return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=28`);
    }
  
    // adventure
    fetchAdventureMovies(): Observable<any> {
      return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=12`);
    }
  
    // animation
    fetchAnimationMovies(): Observable<any> {
      return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=16`);
    }
  
    // comedy
    fetchComedyMovies(): Observable<any> {
      return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=35`);
    }
  
    // documentary
    fetchDocumentaryMovies(): Observable<any> {
      return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=99`);
    }
  
    // science-fiction:878
  
    fetchScienceFictionMovies(): Observable<any> {
      return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=878`);
    }
  
    // thriller:53
    fetchThrillerMovies(): Observable<any> {
      return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=53`);
    }

    fetchGenre(id: string): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=08cc33bd5ae3a747598ce2ad84376e66&with_genres=${id}`)
    }

    getGenres(): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`)
    }

    getRecommended(id: string): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${this.apiKey}`)
    }

    getUpcoming(): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}`)
    }
    getTopRated(): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}`)
    }
    getNowPlaying(): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}`)
    }
    getFilter(genres: string[], years: string[], countries: string[], sort: string): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&sort_by=${sort}&with_genres=${genres}&primary_release_year=${years}&with_original_language=${countries}`)
    }
    getAllCountries(): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/configuration/languages?api_key=${this.apiKey}`)
    }
    test(): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&sort_by=vote_average.desc`)
    }
}
