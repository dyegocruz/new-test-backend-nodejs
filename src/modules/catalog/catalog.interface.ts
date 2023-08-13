export interface CatalogItem {
  title: string;
  description: string;
  price: number;
}

export interface Catalog {
  ownerId: string;
  categoryTitle: string;
  categoryDescription: string;
  itens: CatalogItem[];
}
