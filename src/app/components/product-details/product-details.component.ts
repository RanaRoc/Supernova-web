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
    Marque: '',
    Duree_de_vie: '',
    Efficacite_Lumineuse: '',
    Flux_lumineux: '',
    Puissance: 0,
    Temperature_de_couleur: '',
    Image: ''
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
}
