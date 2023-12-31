import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SafePipe } from './safe.pipe';
import { GenresComponent } from './pages/genres/genres.component';
import { NotFoundComponent } from './partial/not-found/not-found.component';
import { LoadingComponent } from './partial/loading/loading.component'
import { LoadingInterceptor } from './loading.interceptor';
import { NavbarComponent } from './partial/navbar/navbar.component';
import { FilterComponent } from './pages/filter/filter.component';
import { ActorDetailsComponent } from './pages/actor-details/actor-details.component';
import { MovieCardComponent } from './partial/movie-card/movie-card.component';
import { MoviesScrollXContainerComponent } from './partial/movies-scroll-x-container/movies-scroll-x-container.component';
import { FilterSearchComponent } from './partial/filter-search/filter-search.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { ToastrModule } from 'ngx-toastr'
// import NoopAnimationsModule from ''
import { BrowserAnimationsModule,  NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MovieVideosComponent } from './partial/movie-videos/movie-videos.component';
import { MovieListsComponent } from './pages/movie-lists/movie-lists.component';
import { LazyLoadImageModule, IntersectionObserverHooks } from 'ng-lazyload-image';
import { StarRatingModule } from 'angular-star-rating';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';

defineComponents(IgcRatingComponent);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    MovieDetailsComponent,
    SafePipe,
    GenresComponent,
    NotFoundComponent,
    LoadingComponent,
    NavbarComponent,
    FilterComponent,
    ActorDetailsComponent,
    MovieCardComponent,
    MoviesScrollXContainerComponent,
    FilterSearchComponent,
    WatchlistComponent,
    MovieVideosComponent,
    MovieListsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LazyLoadImageModule,
    StarRatingModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
