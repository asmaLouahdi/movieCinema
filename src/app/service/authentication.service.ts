import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";

import * as firebase from "firebase";
import { AppUser } from "../modele/user";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  url = "api/user";

  constructor(private http: HttpClient) {}
  AuthLogin(provider) {
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res);
        return res;
      });
  }
  getUser(id: string): Observable<AppUser> {
    let params = new HttpParams();
    params.set("id", id);
    return this.http.get<AppUser>(this.url, { params: params });
  }
  updateUser(appUser: AppUser): Observable<AppUser> {
    return this.http.post<AppUser>(this.url, { user: appUser });
  }
}
