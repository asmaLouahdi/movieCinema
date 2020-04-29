import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  @Output() setStep: EventEmitter<Number> = new EventEmitter();
  @Output() setMode: EventEmitter<string> = new EventEmitter();

  constructor() {}
  goToStep(step: Number) {
    this.setStep.emit(step);
    if (step === 1) {
      this.setMode.emit("movie");
    }
    if (step === 3) {
      this.setMode.emit("plat");
    }
  }
  ngOnInit() {}
}
