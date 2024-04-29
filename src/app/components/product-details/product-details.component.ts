import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnChanges {
  @Input() product?: Product;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentProduct: Product = {
    Cas: 0,
    Combinaison: 0,
    Marque: '',
    Duree_de_vie: '',
    Efficacite_Lumineuse: '',
    Flux_lumineux: '',
    Puissance: 0,
    Temperature_de_couleur: ''
  };
  message = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentProduct = { ...this.product };
  }

  updatePublished(status: boolean): void {
    if (this.currentProduct.Cas) {
      this.productService.update(this.currentProduct.Cas.toString(), { published: status })
      .then(() => {
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

  updateProduct(): void {
    const data = {
      title: this.currentProduct.Marque,
      description: this.currentProduct.Duree_de_vie
    };

    if (this.currentProduct.Cas) {
      this.productService.update(this.currentProduct.Cas.toString(), data)
        .then(() => this.message = 'The product was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteProduct(): void {
    if (this.currentProduct.Cas) {
      this.productService.delete(this.currentProduct.Cas.toString())
        .then(() => {
          this.refreshList.emit();
          this.message = 'The product was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
}
