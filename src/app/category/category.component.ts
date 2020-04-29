import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  @Output() setCategory: EventEmitter<string> = new EventEmitter();
  @Output() setLanguage: EventEmitter<string> = new EventEmitter();
  @Input() category: string;
  @Input() language: string;

  constructor() {}

  ngOnInit() {}

  onCategoryChange(newCategory: string) {
    this.setCategory.emit(newCategory);
  }
  onLanguageChange(newLanguage: string) {
    this.setLanguage.emit(newLanguage);
  }
}
