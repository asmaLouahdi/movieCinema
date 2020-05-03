import { Facture } from "./../modele/Facture";
import { Commande } from "../modele/Commande";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class CommandesService {
  constructor(private http: HttpClient) {}

  url = "/api/commandes";

  getCommandeById(commande_id: string): Observable<Commande> {
    let params = new HttpParams();
    params.set("id", commande_id);
    return this.http.get<Commande>(this.url, {
      params: params,
    });
  }

  createCommande(commande: Commande): Observable<Facture> {
    return this.http.post<Facture>(this.url, { commande: commande });
  }

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.url);
  }
}
