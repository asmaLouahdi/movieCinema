export interface Commande {
  id?: string;
  prix?: number;
  date?: string;
  idClient: string;
  idPlats: string[];
  idFilms: string[];
  addresseLivraison: string;
}
