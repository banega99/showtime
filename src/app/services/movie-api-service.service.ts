import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService{

  constructor(private http:HttpClient) {
    // this.getGenres().subscribe(console.log)
    // this.getAllCountries().subscribe(console.log)
   }

  baseUrl = "https://api.themoviedb.org/3"
  apiKey = "08cc33bd5ae3a747598ce2ad84376e66"

   httpHeaders = {
    headers: new HttpHeaders({      
      'Authorization': 'Bearer ' + this.apiKey 
    })
  };

  bannerApi = `${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}`

  bannerApiData(): Observable<any>{
    return this.http.get(`${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}`)
  }

  trendingApiData(page: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}&page=${page}`)
  }

  getMovieBytitle(title: string, page: any): Observable<any>{
    return this.http.get(`${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${title}&page=${page}`)
  }
  getMulti(title: string, page: any): Observable<any>{
    return this.http.get(`${this.baseUrl}/search/multi?api_key=${this.apiKey}&query=${title}&page=${page}`)
  }
  getActor(title: string, page: any): Observable<any>{
    return this.http.get(`${this.baseUrl}/search/person?api_key=${this.apiKey}&query=${title}&page=${page}`)
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
    fetchActionMovies(page: any): Observable<any> {
      return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=28&page=${page}`);
    }
  
    // adventure
    fetchAdventureMovies(page: any): Observable<any> {
      return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=12&page=${page}`);
    }
  
    // animation
    fetchAnimationMovies(page: any): Observable<any> {
      return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=16&page=${page}`);
    }
  
    // comedy
    fetchComedyMovies(page: any): Observable<any> {
      return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=35&page=${page}`);
    }
  
    // documentary
    fetchDocumentaryMovies(page: any): Observable<any> {
      return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=99&page=${page}`);
    }
  
    // science-fiction:878
  
    fetchScienceFictionMovies(page: any): Observable<any> {
      return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=878&page=${page}`);
    }
  
    // thriller:53
    fetchThrillerMovies(page: any): Observable<any> {
      return this.http.get(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&with_genres=53&page=${page}`);
    }

    fetchGenre(id: string, page: any): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=08cc33bd5ae3a747598ce2ad84376e66&with_genres=${id}&page=${page}`)
    }

    getGenres(): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`)
    }

    getRecommended(id: string): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${this.apiKey}`)
    }

    getUpcoming(): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&page=1`)
    }
    getTopRated(): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&page=1`)
    }
    getNowPlaying(): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&page=1`)
    }
    getPopular(): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&page=1`)
    }
    getMovieLists(movieList: string, page: string): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/movie/${movieList}?api_key=${this.apiKey}&page=${page}`)
    }



    getFilter(genres: string[], years: string[], countries: string[], sort: string): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&sort_by=${sort}&with_genres=${genres}&primary_release_year=${years}&with_original_language=${countries}`)
    }
    getAllCountries(): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/configuration/languages?api_key=${this.apiKey}`)
    }
    getActorDetails(id: string): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/person/${id}?api_key=${this.apiKey}`)
    }
    getMovieCredits(id: string): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${this.apiKey}`)
    }
    test(): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&sort_by=vote_average.desc`)
    }

    getToken(): Observable<any>{
      return this.http.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.apiKey}`)
    }
    createSession(token:any): Observable<any>{
      return this.http.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${this.apiKey}`, {'request_token': token})
    }

    getMovieReviews(id: string): Observable<any> {
      return this.http.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${this.apiKey}`)
    }

    getMovieImages(id: string): Observable<any> {
      return this.http.get(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${this.apiKey}`)
    }
    getActorImages(id: string): Observable<any> {
      return this.http.get(`https://api.themoviedb.org/3/person/${id}/images?api_key=${this.apiKey}`)
    }
}
