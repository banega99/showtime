import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { GenresComponent } from './pages/genres/genres.component';
import { FilterComponent } from './pages/filter/filter.component';
import { ActorDetailsComponent } from './pages/actor-details/actor-details.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { MovieListsComponent } from './pages/movie-lists/movie-lists.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'search/:type/:title/:page', component:SearchComponent},
  {path: 'movie/:id', component:MovieDetailsComponent},
  {path: 'genres/:genre/:id/:page', component:GenresComponent},
  {path: 'filter/:genre/:year/:country/:sort/:page', component:FilterComponent},
  {path: 'actor-details/:id', component:ActorDetailsComponent},
  {path: 'watchlist', component:WatchlistComponent},
  {path: 'movie-list/:list/:page', component:MovieListsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
