import { Product } from "./product.model";
import { Project } from "./project.model";
export class User {
  Key?: string;
  Nom?: string;
  Prenom?: string;
  Email?: string;
  NumTel?: string;
  NomAg?: string;
  Mdp?: string;
  Confirmed?: boolean;
  wishList?: { key: string, data: Product }[] = [];
  Projects: Project[] = [];
}


