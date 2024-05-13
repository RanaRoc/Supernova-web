import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/produit';

  productsRef: AngularFireList<Product>;

  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Product> {
    return this.productsRef;
  }

  create(product: Product): any {
    return this.productsRef.push(product);
  }

  update(key: string, value: any): Promise<void> {
    return this.productsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.productsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.productsRef.remove();
  }
  getProductByCas(Cas: number): AngularFireList<Product> {
    return this.db.list('/produit', ref => ref.orderByChild('Cas').equalTo(Cas));
  }
}
