import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Facture } from "../modele/Facture";

@Component({
  selector: "app-facture",
  templateUrl: "./facture.component.html",
  styleUrls: ["./facture.component.scss"],
})
export class FactureComponent implements OnInit {
  @Input() facture: Facture;
  @Input() userName: string;

  //@Output() setMoviesToOrder: EventEmitter<string> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
