import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { GenresComponent } from './pages/genres/genres.component';
import { FilterComponent } from './pages/filter/filter.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'search/:movieTitle', component:SearchComponent},
  {path: 'movie/:id', component:MovieDetailsComponent},
  {path: 'genres/:genre/:id', component:GenresComponent},
  {path: 'filter/:genre/:year/:country/:sort', component:FilterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
