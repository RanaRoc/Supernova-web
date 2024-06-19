import { Product } from "./product.model";

export class Project {
  id?: number;
  Nom?: string;
  Products?: { key: string, data: Product }[] = [];
}


