import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Response } from '../models/response.model';
import { take } from 'rxjs';

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
  saveResponsesToFirebase(responses: Response[]): Promise<void[]> {
    const promises: Promise<void>[] = [];
    responses.forEach(response => {
      promises.push(this.create(response).then(() => console.log('Response saved:', response)));
    });
    return Promise.all(promises);
  }
  getResponsesByStyle(selectedStyle: string,selectedEspace : string, selectedFinition : string, selectedForme: string, selectedMaterial : string): AngularFireList<Response> {

    return this.db.list(this.dbPath, ref => ref.orderByChild('style').equalTo(selectedStyle)
  .orderByChild('Espace_a_traiter').equalTo(selectedEspace)
  .orderByChild('Finition').equalTo(selectedFinition)
  .orderByChild('Forme').equalTo(selectedForme)
  .orderByChild('Materiaux_de_surface_de_pose').equalTo(selectedMaterial));

  }
  async clearDatabase(): Promise<void[]> {
    console.log("removing responses");

    const responses = await this.responsesRef.snapshotChanges().pipe(take(1)).toPromise();
    const promises: Promise<void>[] = [];

    responses.forEach(response => {
      promises.push(this.responsesRef.remove(response.key));
    });

    return Promise.all(promises);
  }
}
