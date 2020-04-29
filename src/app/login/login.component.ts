import { AuthInfo } from "../modele/AuthInfo";
import { HttpClient, HttpResponse, HttpParams } from "@angular/common/http";
import { Component, OnInit, NgZone, Output, EventEmitter } from "@angular/core";
import { User } from "../modele/user";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { AuthenticationService } from "../service/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  @Output() setLogin: EventEmitter<AuthInfo> = new EventEmitter();

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public authenticationService: AuthenticationService,
    private httpClient: HttpClient
  ) {
    afAuth.user.subscribe(async (u: User) => {
      console.log("L’utilisateur Firebasse est ", u);
      // On contacte le serveur métier pour l'informer si un nouvel utilisateur existe :
      if (u !== null) {
        const reponseServeur = await this.authenticationService
          .checkAuthentification(u)
          .subscribe((response) => {
            console.log(response);
          });
      }
    });
  }
  googleAuth() {
    this.authenticationService
      .AuthLogin(new auth.GoogleAuthProvider())
      .then((res) => {
        this.setLogin.emit({ isLogged: true, uid: res.user.uid });
      });
  }
  faceBookAuth() {
    this.authenticationService
      .AuthLogin(new auth.FacebookAuthProvider())
      .then((res) => {
        this.setLogin.emit({ isLogged: true, uid: res.user.uid });
      });
  }
  twitterAuth() {
    this.authenticationService
      .AuthLogin(new auth.TwitterAuthProvider())
      .then((res) => {
        this.setLogin.emit({ isLogged: true, uid: res.user.uid });
      });
  }
  ngOnInit() {}
}
