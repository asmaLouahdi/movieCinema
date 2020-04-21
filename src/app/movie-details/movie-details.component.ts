import { MovieResponse } from "./../tmdb-data/Movie";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrls: ["./movie-details.component.scss"],
})
export class MovieDetailsComponent implements OnInit {
  @Input() movie: MovieResponse;
  image: String; //"https://image.tmdb.org/t/p/w220_and_h330_face" + this.movie.poster_path;
  background: string;
  constructor() {}

  ngOnInit(): void {
    this.image =
      "https://image.tmdb.org/t/p/w300_and_h450_bestv2" +
      this.movie.poster_path;
    this.background =
      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces" +
      this.movie.poster_path;
  }
}
