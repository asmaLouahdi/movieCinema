import { CommandesService } from "./../service/commandes.service";
import { Commande } from "../modele/Commande";
import { AuthInfo } from "../modele/AuthInfo";
import { Component, OnInit } from "@angular/core";
import { MovieResponse } from "../tmdb-data/Movie";
import { MoviesService } from "../service/movies.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  step: Number;
  movieToDisplay: MovieResponse;
  category: string = "popular";
  language: string = "all";
  platType: string = "Dessert";

  authInfo: AuthInfo = {
    isLogged: false,
    uid: "",
  };
  mode: string = "movie";

  platsToOrder: string[] = [];
  movieToOrder: string[] = [];

  constructor(
    public moviesService: MoviesService,
    public commandesService: CommandesService
  ) {}

  setMovieToDisplay(movie_id: number) {
    this.moviesService.getMovieById(movie_id).subscribe((movie) => {
      this.movieToDisplay = movie;
      this.step = 3;
    });
  }
  setPlatsToOrder(platsId: string[]) {
    this.platsToOrder = platsId;
    if (this.mode == "plat") {
      this.step = 2;
    } else {
      this.step = 1;
    }
  }
  setMoviesToOrder(movieId: string) {
    this.movieToOrder.push(movieId);
    if ((this.mode = "movie")) {
      this.step = 1;
    } else {
      this.step = 0;
    }
  }
  setConnexion(auth: AuthInfo) {
    this.authInfo = auth;
    this.step = 1;
  }
  setStep(step: Number) {
    if (step === 6) this.authInfo.isLogged = false;
    this.step = step;
  }
  setCategory(category: string) {
    this.category = category;
  }
  setMode(mode: string) {
    this.mode = mode;
  }

  validateCommande(address: string) {
    const commande: Commande = {
      idPlats: this.platsToOrder,
      idFilms: this.movieToOrder,
      idClient: this.authInfo.uid,
      addresseLivraison: address,
    };

    return this.commandesService
      .createCommande(commande)
      .subscribe((commande) => {
        this.movieToOrder = [];
        this.platsToOrder = [];
        console.log("added successfully");
      });
  }
  setLanguage(newLanguage: string) {
    this.language = newLanguage;
  }
  setPlatType(platType: string) {
    this.platType = platType;
  }

  ngOnInit() {
    this.step = 1;
  }
}
