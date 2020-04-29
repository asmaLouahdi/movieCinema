import { MoviesService } from "./../service/movies.service";
import { MovieResponse } from "./../tmdb-data/Movie";
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  SimpleChanges,
} from "@angular/core";
@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.css"],
})
export class MoviesListComponent implements OnInit {
  @Output() setMovieToDisplay: EventEmitter<Number> = new EventEmitter();
  @Input() category: string;
  @Input() language: string;

  moviesList: MovieResponse[] = [];
  page: number = 1;
  allMovies: MovieResponse[];

  constructor(public moviesService: MoviesService) {}

  ngOnInit() {
    this.getMovies();
  }

  ngOnChanges(changements: SimpleChanges) {
    if (changements.category) {
      this.getNewCatMovies(changements.category.currentValue);
    } else {
      if (changements.language) {
        if (changements.language.currentValue == "all") {
          this.moviesList = this.allMovies;
        } else {
          this.moviesList = this.moviesList.filter((movie) => {
            return movie.original_language == changements.language.currentValue;
          });
        }
      }
    }
  }

  getMovies() {
    switch (this.category) {
      case "popular": {
        this.moviesService.getPopularMovies(this.page).subscribe((movies) => {
          this.moviesList = this.moviesList.concat(movies.results);
          this.allMovies = this.moviesList;
        });
        break;
      }
      case "top_rated":
        this.moviesService.getTopRatedMovies(this.page).subscribe((movies) => {
          this.moviesList = this.moviesList.concat(movies.results);
          this.allMovies = this.moviesList;
        });
        break;
      case "now_playing": {
        this.moviesService
          .getNowPlayingMovies(this.page)
          .subscribe((movies) => {
            this.moviesList = this.moviesList.concat(movies.results);
            this.allMovies = this.moviesList;
          });
        break;
      }
      default:
        break;
    }
  }
  getNewCatMovies(newCategory: string) {
    switch (newCategory) {
      case "popular": {
        this.moviesService.getPopularMovies(this.page).subscribe((movies) => {
          this.moviesList = movies.results;
          this.allMovies = this.moviesList;
        });
        break;
      }
      case "top_rated":
        this.moviesService.getTopRatedMovies(this.page).subscribe((movies) => {
          this.moviesList = movies.results;
          this.allMovies = this.moviesList;
        });
        break;
      case "now_playing": {
        this.moviesService
          .getNowPlayingMovies(this.page)
          .subscribe((movies) => {
            this.moviesList = movies.results;
            this.allMovies = this.moviesList;
          });
        break;
      }
      default:
        break;
    }
  }
  displayMovie(movie_id: Number) {
    this.setMovieToDisplay.emit(movie_id);
  }
  afficherPlus() {
    this.page++;
    this.getMovies();
  }
}
