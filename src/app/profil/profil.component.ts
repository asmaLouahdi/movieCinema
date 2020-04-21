import { AppUser } from "./../services/User";
import { Component, OnInit, Input } from "@angular/core";
import { HttpParams, HttpClient } from "@angular/common/http";

@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.css"],
})
export class ProfilComponent implements OnInit {
  @Input() uid: string;
  moviesList: any;
  user: AppUser;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.httpClient
      .get("/api/currentUser", {
        params: new HttpParams().set("uid", this.uid),
      })
      .subscribe((response: any) => {
        this.user = response.result;
      });
  }
  updateProfil() {
    return this.httpClient
      .post(
        "/api/updateProfil",
        { user: this.user },
        {
          observe: "response",
          responseType: "text",
          headers: { "content-type": "application/x-www-form-urlencoded" },
        }
      )
      .toPromise()
      .then((response) => {
        console.log("updated successfully");
      })
      .catch((err) => {
        console.log("error" + err);
      });
  }
}
