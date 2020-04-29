import { PlatsService } from "./../service/plats.service";
import { MovieResponse } from "./../tmdb-data/Movie";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Commande } from "../modele/Commande";
import { Plat } from "../modele/Plat";
import { MoviesService } from "../service/movies.service";
import { CommandesService } from "../service/commandes.service";

@Component({
  selector: "app-historique",
  templateUrl: "./historique.component.html",
  styleUrls: ["./historique.component.css"],
})
export class HistoriqueComponent implements OnInit {
  platBD: Plat[] = [
    {
      id: 1,
      title: "fondant au chocolat",
      type: "Dessert",
      prix: 12,
      photo:
        "https://imgcdn.circulaire-en-ligne.ca/wp-content/uploads/fondants-au-chocolat.jpg",
      ingredients: ["Chocolat", "Mozzarella"],
    },
    {
      id: 2,
      title: "fondant",
      type: "Dessert",
      prix: 12,
      photo:
        "https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/elle-a-table/les-dossiers-de-la-redaction/dossier-de-la-redac/menu-gastronomique/88780110-1-fre-FR/Comment-faire-un-menu-gastronomique.jpg",
      ingredients: ["Chocolat", "Mozzarella"],
    },
    {
      id: 3,
      title: "chocolat",
      type: "Plat",
      prix: 12,
      photo:
        "https://imgcdn.circulaire-en-ligne.ca/wp-content/uploads/fondants-au-chocolat.jpg",
      ingredients: ["Chocolat", "Mozzarella"],
    },
    {
      id: 4,
      title: "fondant au chocolat",
      type: "Dessert",
      prix: 12,
      photo:
        "https://imgcdn.circulaire-en-ligne.ca/wp-content/uploads/fondants-au-chocolat.jpg",
      ingredients: ["Chocolat", "Mozzarella"],
    },
    {
      id: 5,
      title: "fondant au chocolat",
      type: "Dessert",
      prix: 12,
      photo:
        "https://imgcdn.circulaire-en-ligne.ca/wp-content/uploads/fondants-au-chocolat.jpg",
      ingredients: ["Chocolat", "Mozzarella"],
    },
    {
      id: 6,
      title: "fondant au chocolat",
      type: "Dessert",
      prix: 12,
      photo:
        "https://imgcdn.circulaire-en-ligne.ca/wp-content/uploads/fondants-au-chocolat.jpg",
      ingredients: ["Chocolat", "Mozzarella"],
    },
  ];
  commandesList: Commande[] = [
    {
      id: "1",
      prix: 120,
      date: "12/03/2020",
      idClient: "2",
      idPlats: ["1", "2", "3"],
      idFilms: ["419704", "454626"],
      addresseLivraison: "",
    },
    {
      id: "2",
      prix: 890,
      date: "12/03/2019",
      idClient: "2",
      idPlats: ["4", "5", "6"],
      idFilms: ["495764"],
      addresseLivraison: "",
    },
  ];

  allMovies: MovieResponse[] = [];
  allPlats: Plat[] = [];

  constructor(
    public moviesService: MoviesService,
    public commandesService: CommandesService,
    public platsService: PlatsService
  ) {}

  ngOnInit() {
    this.getCommandes();
    this.commandesList.map((commande) => {
      let movies = commande.idFilms.filter(this.onlyUnique);
      for (let movieId of movies) {
        this.moviesService.getMovieById(+movieId).subscribe((movie) => {
          this.allMovies.push(movie);
        });
      }
      let plats = commande.idPlats.filter(this.onlyUnique);

      for (let platId of plats) {
        this.getPlat(platId);
      }
    });
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  getCommandes() {
    this.commandesService.getCommandes().subscribe((commandes) => {
      this.commandesList = commandes;
    });

    //add clientId
    /* this._httpClient.get("/api/commandes").subscribe((response: any) => {
      this.commandesList = response.results;
    });*/
  }
  currentPlatPrix(platId: string): number {
    if (this.allPlats.length) {
      return this.allPlats.filter((plat) => {
        return plat.id + "" === platId;
      })[0].prix;
    }
    return 0;
  }
  currentPlatType(platId): string {
    if (this.allPlats.length) {
      return this.allPlats.filter((plat) => {
        return plat.id + "" === platId;
      })[0].type;
    }
    return "";
  }
  currentPlatTitle(platId): string {
    if (this.allPlats.length) {
      return this.allPlats.filter((plat) => {
        return plat.id + "" === platId;
      })[0].title;
    }
    return "";
  }

  getPlat(platId: string) {
    /* const plat = this.platBD.filter((plat) => {
      return plat.id + "" == platId;
    })[0];
    this.allPlats.push(plat);
    return plat;*/
    this.platsService.getPlatById(platId).subscribe((plat) => {
      this.allPlats.push(plat);
    });
    /*let params = new HttpParams().set("id", platId);
    this._httpClient
      .get("/api/commandes", { params: params })
      .subscribe((response: any) => {
        this.allPlats.push(response.results);
      });*/
  }
  currentPlatPhoto(platId: string): string {
    return this.allPlats.filter((plat) => {
      return plat.id + "" == platId;
    })[0].photo;
  }
  getQuantite(commandeId: string, platId: string, quantite: number): boolean {
    return (
      this.commandesList
        .filter((commande) => {
          return commande.id === commandeId;
        })[0]
        .idPlats.filter((idPlat) => {
          idPlat == platId;
        }).length === quantite
    );
  }
  currentMoviePhoto(movieId: string) {
    if (this.allMovies.length) {
      return (
        "https://image.tmdb.org/t/p/w220_and_h330_face" +
        this.allMovies.filter((movie) => {
          return movie.id + "" == movieId;
        })[0].poster_path
      );
    }
    return "";
  }

  currentMovieTitle(movieId): string {
    if (this.allMovies.length) {
      return this.allMovies.filter((movie) => {
        return movie.id + "" == movieId;
      })[0].title;
    }
    return "";
  }
  currentMovieDate(movieId): string {
    if (this.allMovies.length) {
      return this.allMovies.filter((movie) => {
        return movie.id + "" == movieId;
      })[0].release_date;
    }
    return "";
  }
}
