import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../models/response.model';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';
import { ResponseService } from './response.service';
@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {
constructor(private http: HttpClient, private productService: ProductService, private responseService: ResponseService) { }
fetchDataFromGoogleSheet(): Promise<{ responses: Response[], products: Product[] }> {
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTkJvWMVuaZ-A1avl-GFeF1yvhzMNGn2bK1ynBn1wtqVVu7ZV5P1EKDzV7HrOPJwg/pub?gid=2061900632&single=true&output=csv'; // Replace with your Google Sheet URL

  return this.http.get(sheetUrl, { responseType: 'text' })
    .toPromise()
    .then(csvData => {
      const rows = csvData.split('\n').map(row => row.split(','));
      const responses: Response[] = [];
      const products: Product[] = [];

      // Delete existing data from the realtime database
      // Add your code here to delete existing data from the realtime database

      for (let i = 2; i < rows.length; i++) {
        const row = rows[i];
        const puissance = parseFloat(row[11]);
        if (isNaN(puissance)) {
          continue;
        }
        const product: Product = {
          Cas: i,
          Marque: row[10],
          Puissance: puissance,
          Flux_lumineux: row[12],
          Temperature_de_couleur: row[13],
          Efficacite_Lumineuse: row[14],
          Duree_de_vie: row[15],
          Image: ''
        };
        console.log(product);
        products.push(product);
        this.productService.addProduct(product);
        const response: Response = {
          Cas: i,
          Segment: row[0],
          Type_de_projet: row[1],
          Style: row[2],
          Standing: row[3],
          Espace_a_traiter: row[4],
          Surface_de_pose: row[5],
          Mode_de_pose: row[6],
          Materiaux_de_surface_de_pose: row[7],
          Forme: row[8],
          Finition: row[9]
        };
        responses.push(response);
        this.responseService.create(response);
      }

      // Add your code here to push the data to the realtime database

      return { responses, products };
    });
}
}
