import { AuthInfo } from "./../services/AuthInfo";
import { Component, OnInit } from "@angular/core";
import { MovieResponse } from "../tmdb-data/Movie";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  step: Number;
  movieToDisplay: MovieResponse;
  category: string = "popular";
  authInfo: AuthInfo = {
    isLogged: false,
    uid: "",
  };
  constructor(private _httpClient: HttpClient) {}

  setMovieToDisplay(movie_id: Number) {
    let _movieAPIUrl =
      " https://api.themoviedb.org/3/movie/" +
      movie_id +
      "?api_key=110b948bfb9c7fb9f82272cb5294ad76&language=en-US";

    this._httpClient.get(_movieAPIUrl).subscribe((response) => {
      this.movieToDisplay = response;
      this.step = 2;
    });
  }
  setConnexion(auth: AuthInfo) {
    this.authInfo = auth;
    this.step = 1;
  }
  setStep(step: Number) {
    if (step === 5) this.authInfo.isLogged = false;
    this.step = step;
  }
  setCategory(category: string) {
    this.category = category;
  }

  ngOnInit() {
    this.step = 1;
  }
}
