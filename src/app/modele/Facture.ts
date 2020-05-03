import { Plat } from "./Plat";

export interface Facture {
  idFacture: string;
  idClient: string;
  adresseRestaurant: string;
  adresseLivraison: string;
  date: string;
  emailRestaurant: string;
  montant: number;
  nomRestaurant: string;
  plats: Plat[];
  telephone: string;
}
