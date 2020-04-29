import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-category-plats",
  templateUrl: "./category-plats.component.html",
  styleUrls: ["./category-plats.component.scss"],
})
export class CategoryPlatsComponent implements OnInit {
  @Output() setPlatType: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onCategoryChange(newCategory: string) {
    this.setPlatType.emit(newCategory);
  }
}
