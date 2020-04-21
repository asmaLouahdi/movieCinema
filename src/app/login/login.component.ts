import { AuthInfo } from "./../services/AuthInfo";
import { HttpClient, HttpResponse, HttpParams } from "@angular/common/http";
import { Component, OnInit, NgZone, Output, EventEmitter } from "@angular/core";
import { User } from "../services/user";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import * as firebase from "firebase";

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
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public router: Router,
    private httpClient: HttpClient
  ) {
    afAuth.user.subscribe(async (u: User) => {
      console.log("L’utilisateur Firebasse est ", u);
      // On contacte le serveur métier pour l'informer si un nouvel utilisateur existe :
      if (u !== null) {
        const reponseServeur = await this.POST("/api/authentification", {
          userId: u.uid,
        }).catch((err) => {
          console.log(err);
        });
        console.log("Le serveur répond", reponseServeur);
      }
    });
  }

  POST(
    url: string,
    params: { [key: string]: string }
  ): Promise<HttpResponse<string>> {
    const P = new HttpParams({ fromObject: params });
    return this.httpClient
      .post(url, P, {
        observe: "response",
        responseType: "text",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      })
      .toPromise();
  }
  googleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }
  faceBookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }
  twitterAuth() {
    return this.AuthLogin(new auth.TwitterAuthProvider());
  }

  AuthLogin(provider) {
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        this.setLogin.emit({ isLogged: true, uid: res.user.uid });
      });
  }

  SignIn() {
    console.log(this.password);
    return firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.password)
      .then((res) => {
        this.setLogin.emit({ isLogged: true, uid: res.user.uid });
      })
      .catch((err) => {
        console.log("Something is wrong:", err.message);
      });
  }

  ngOnInit() {}
}
