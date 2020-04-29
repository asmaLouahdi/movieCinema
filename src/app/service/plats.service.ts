import { Plat } from "../modele/Plat";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class PlatsService {
  constructor(private http: HttpClient) {}
  url = "/api/plats";
  getPlats(): Observable<Plat[]> {
    return this.http.get<Plat[]>(this.url);
  }
  getPlatById(plat_id: string): Observable<Plat> {
    let params = new HttpParams();
    params.set("id", plat_id);
    return this.http.get<Plat>(this.url, {
      params: params,
    });
  }
}
