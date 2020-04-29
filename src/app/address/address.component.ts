import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"],
})
export class AddressComponent implements OnInit {
  @Output() validateCommande: EventEmitter<string> = new EventEmitter();
  ligne1: string;
  ligne2: string;
  code: string;
  ville: string;
  numero: string;
  constructor() {}
  valider() {
    this.validateCommande.emit(
      this.ligne1 + " " + this.ligne2 + " " + this.ville + " " + this.code
    );
  }
  ngOnInit(): void {}
}
