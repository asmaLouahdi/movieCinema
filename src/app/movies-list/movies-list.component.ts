import { MovieResponse } from "./../tmdb-data/Movie";
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  SimpleChanges,
} from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.css"],
})
export class MoviesListComponent implements OnInit {
  @Output() setMovieToDisplay: EventEmitter<Number> = new EventEmitter();
  @Input() category: string;

  moviesList: MovieResponse[] = [];
  page: number = 1;
  private _movieAPIUrl: string;

  constructor(private _httpClient: HttpClient) {}

  ngOnInit() {
    this._movieAPIUrl =
      "https://api.themoviedb.org/3/movie/" +
      this.category +
      "?api_key=110b948bfb9c7fb9f82272cb5294ad76&language=en-US&page=";
    this.getMovies(this._movieAPIUrl + this.page);
  }
  ngOnChanges(changements: SimpleChanges) {
    this._movieAPIUrl =
      "https://api.themoviedb.org/3/movie/" +
      changements.category.currentValue +
      "?api_key=110b948bfb9c7fb9f82272cb5294ad76&language=en-US&page=";
    this.getNewCatMovies(this._movieAPIUrl + this.page);
  }

  getMovies(url) {
    this._httpClient.get(url).subscribe((response: any) => {
      this.moviesList = this.moviesList.concat(response.results);
    });
  }
  getNewCatMovies(url) {
    this._httpClient.get(url).subscribe((response: any) => {
      this.moviesList = response.results;
    });
  }
  displayMovie(movie_id: Number) {
    this.setMovieToDisplay.emit(movie_id);
  }
  afficherPlus() {
    this.page++;
    this.getMovies(this._movieAPIUrl + this.page);
  }
}
