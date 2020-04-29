import { AuthenticationService } from "./../service/authentication.service";
import { AppUser } from "../modele/User";
import { Component, OnInit, Input } from "@angular/core";
import { HttpParams, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.css"],
})
export class ProfilComponent implements OnInit {
  @Input() uid: string;
  moviesList: any;
  user: AppUser;

  constructor(public authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.getUser(this.uid).subscribe((currentUser) => {
      this.user = currentUser;
    });
  }
  updateProfil() {
    this.authenticationService.updateUser(this.user).subscribe((user) => {
      console.log("updated successfully");
    });
  }
}
