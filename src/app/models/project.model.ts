import { Product } from "./product.model";

export class Project {
  key?: number;
  Nom?: string;
  Products?: Product[] = [];
  Espace?: espace[] = [];
}

class espace {
  value: string; label: string; image: string; alt: string;}


