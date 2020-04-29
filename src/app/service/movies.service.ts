import { MovieResponse } from "./../tmdb-data/Movie";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  constructor(private http: HttpClient) {}
  private apiURL = "https://api.themoviedb.org/3/movie/";
  private apiKey = "110b948bfb9c7fb9f82272cb5294ad76";
  private language = "en-US";
  popularAPIUrl = `${this.apiURL}popular?api_key=${this.apiKey}&language=${this.language}&page=`;
  nowPlayingAPIUrl = `${this.apiURL}now_playing?api_key=${this.apiKey}&language=${this.language}&page=`;

  topRatedAPIUrl = `${this.apiURL}top_rated?api_key=${this.apiKey}&language=${this.language}&page=`;

  getPopularMovies(page: number): Observable<any> {
    return this.http.get<any>(this.popularAPIUrl + page);
  }
  getNowPlayingMovies(page: number): Observable<any> {
    return this.http.get<any>(this.nowPlayingAPIUrl + page);
  }
  getTopRatedMovies(page: number): Observable<any> {
    return this.http.get<any>(this.topRatedAPIUrl + page);
  }
  getMovieById(movie_id: number): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiURL}${movie_id}?api_key=${this.apiKey}&language=${this.language}`
    );
  }
}
