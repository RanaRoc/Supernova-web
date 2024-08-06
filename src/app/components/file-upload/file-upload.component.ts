import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Response as CustomResponse }  from '../../models/response.model';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  private responseData: CustomResponse[] = [];
  private productData: Product[] = [];

  constructor(private db: AngularFireDatabase, private router: Router ) {}

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      // Extract data from "Combinaisons" sheet
      const responseSheet: XLSX.WorkSheet = wb.Sheets['Combinaisons'];
      if (responseSheet) {
        const responseData = <any[]>XLSX.utils.sheet_to_json(responseSheet, { header: 1 });
        this.responseData = this.mapResponseData(responseData);
      }

      // Extract data from "Produits" sheet
      const productSheet: XLSX.WorkSheet = wb.Sheets['Produits'];
      if (productSheet) {
        const productData = <any[]>XLSX.utils.sheet_to_json(productSheet, { header: 1 });
        this.productData = this.mapProductData(productData);
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }

  mapResponseData(sheetData: any[]): CustomResponse[] {
    const headers = sheetData[0];
    return sheetData.slice(1).map(row => {
      const response: CustomResponse = {};
      headers.forEach((header: string, index: number) => {
        if (row[index] !== undefined) {
          response[header] = row[index];
        }
      });
      return response;
    });
  }

  mapProductData(sheetData: any[]): Product[] {
    const headers = sheetData[0];
    return sheetData.slice(1).map(row => {
      const product: Product = {};
      headers.forEach((header: string, index: number) => {
        if (row[index] !== undefined) {
          product[header] = row[index];
        }
      });
      return product;
    });
  }

    uploadData() {
      this.db.object('RepQuest').set(this.responseData)
        .then(() => console.log('Responses data successfully uploaded!'))
        .catch(error => console.error('Error uploading response data:', error));

      this.db.object('produit').set(this.productData)
        .then(() => console.log('Products data successfully uploaded!'))
        .catch(error => console.error('Error uploading product data:', error));
    }
    goBack(){
      this.router.navigate(['/users']);
    }
  }


