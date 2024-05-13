import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private dbPath = '/RepQuest';

  responsesRef: AngularFireList<Response>;

  constructor(private db: AngularFireDatabase) {
    this.responsesRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Response> {
    return this.responsesRef;
  }

  create(response: Response): any {
    return this.responsesRef.push(response);
  }

  update(key: string, value: any): Promise<void> {
    return this.responsesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.responsesRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.responsesRef.remove();
  }
}
