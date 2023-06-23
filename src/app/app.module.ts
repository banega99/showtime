import { NgModule } from '@angular/core';
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
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
