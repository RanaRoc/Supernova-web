import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Product } from '../models/product.model';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbPath = '/produit';

  productsRef: AngularFireList<Product>;

  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list(this.dbPath);
  }
  addProduct(product: Product): void {
     this.productsRef.push(product);
  }
  getAll(): AngularFireList<Product> {
    return this.productsRef;
  }

  getProductByCas(cas: number): Observable<Product[]> {

    return this.db.list<Product>('/produit', ref => ref.orderByChild('Cas').equalTo(cas)).valueChanges();

  }

}
