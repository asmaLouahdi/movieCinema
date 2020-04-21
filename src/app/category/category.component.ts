import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  @Output() setCategory: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onCategoryChange(newCategory: string) {
    console.log(newCategory);
    this.setCategory.emit(newCategory);
  }
}
