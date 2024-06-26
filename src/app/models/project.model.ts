import { Product } from "./product.model";

export class Project {
  key?: number;
  Nom?: string;
  Products?: { key: string, data: Product }[] = [];
}


