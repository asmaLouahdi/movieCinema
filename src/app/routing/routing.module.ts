import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router"; // CLI imports router
import { MoviesListComponent } from "../movies-list/movies-list.component";
import { MovieDetailsComponent } from "../movie-details/movie-details.component";

const routes: Routes = [
  { path: "movie", component: MoviesListComponent },
  { path: "movie-details", component: MovieDetailsComponent },
];
// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
