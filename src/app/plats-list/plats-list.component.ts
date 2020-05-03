import { PlatsService } from "./../service/plats.service";
import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { Plat } from "../modele/Plat";
@Component({
  selector: "app-plats-list",
  templateUrl: "./plats-list.component.html",
  styleUrls: ["./plats-list.component.scss"],
})
export class PlatsListComponent implements OnInit {
  @Output() setPlatsToOrder: EventEmitter<object> = new EventEmitter();
  @Input() type: string;
  platsToOrder: number[] = [];
  prix: number = 0;

  platsList: Plat[] = [
    {
      id: 1,
      title: "fondant au chocolat",
      type: "Dessert",
      prix: 12,
      photo:
        "https://imgcdn.circulaire-en-ligne.ca/wp-content/uploads/fondants-au-chocolat.jpg",
      ingredients: ["Chocolat", "Mozzarella"],
    },
    {
      id: 2,
      title: "fondant au chocolat",
      type: "Dessert",
      prix: 12,
      photo:
        "https://imgcdn.circulaire-en-ligne.ca/wp-content/uploads/fondants-au-chocolat.jpg",
      ingredients: ["Chocolat", "Mozzarella"],
    },
    {
      id: 3,
      title: "fondant au chocolat",
      type: "Dessert",
      prix: 12,
      photo:
        "https://imgcdn.circulaire-en-ligne.ca/wp-content/uploads/fondants-au-chocolat.jpg",
      ingredients: ["Chocolat", "Mozzarella"],
    },
    {
      id: 4,
      title: "fondant au chocolat",
      type: "Dessert",
      prix: 12,
      photo:
        "https://imgcdn.circulaire-en-ligne.ca/wp-content/uploads/fondants-au-chocolat.jpg",
      ingredients: ["Chocolat", "Mozzarella"],
    },
    {
      id: 5,
      title: "fondant au chocolat",
      type: "Dessert",
      prix: 12,
      photo:
        "https://imgcdn.circulaire-en-ligne.ca/wp-content/uploads/fondants-au-chocolat.jpg",
      ingredients: ["Chocolat", "Mozzarella"],
    },
    {
      id: 6,
      title: "fondant au chocolat",
      type: "Dessert",
      prix: 12,
      photo:
        "https://imgcdn.circulaire-en-ligne.ca/wp-content/uploads/fondants-au-chocolat.jpg",
      ingredients: ["Chocolat", "Mozzarella"],
    },
  ];

  constructor(public platsService: PlatsService) {}

  ngOnInit() {
    this.platsService.getPlats().subscribe((data) => {
      this.platsList = data;
    });
  }

  getPlats() {
    /* this._httpClient.get("/api/plats").subscribe((response: any) => {
      this.platsList = response.results;
    });*/
  }
  setPlats() {
    this.setPlatsToOrder.emit({ plats: this.platsToOrder, prix: this.prix });
  }
  setQuantite(quantite: number, platId: number, platPrix: number) {
    if (quantite == 0) {
      const lastQuant = this.platsToOrder.filter((idPlat) => {
        return idPlat == platId;
      }).length;
      this.prix = this.prix - lastQuant * platPrix;
      this.platsToOrder = this.platsToOrder.filter((idPlat) => {
        return idPlat !== platId;
      });
    } else {
      const lastQuant = this.platsToOrder.filter((idPlat) => {
        return idPlat == platId;
      }).length;
      this.platsToOrder = this.platsToOrder.filter((idPlat) => {
        return idPlat !== platId;
      });
      for (var _i = 0; _i < quantite; _i++) {
        this.platsToOrder.push(platId);
      }
      this.prix = this.prix - lastQuant * platPrix + platPrix * quantite;
    }
  }
  isSelected(id: number) {
    for (let i of this.platsToOrder) {
      if (i === id) {
        return true;
      }
    }
    return false;
  }
}
