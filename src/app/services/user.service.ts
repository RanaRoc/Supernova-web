import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/compat/database';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public userData$: Observable<any> = this.userDataSubject.asObservable();

  public user: Observable<User>;
  private dbPath = '/user';
  usersRef: AngularFireList<User>;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }
  setUserData(userData: any): void {
    this.userDataSubject.next(userData);
  }

  addUser(user: User): void {
    this.usersRef.push(user);
  }

  getAllC(): Observable<{ key: string, data: User }[]> {
    return this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key,
          data: c.payload.val() as User
        })).filter(user => user.data.Confirmed === true)
      )
    );
  }
  checkIfUserExists(email: string, password: string): Observable<User | undefined> {
    this.user = this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key,
          data: c.payload.val() as User
        })).find(user => user.data.Email === email && user.data.Mdp === password)?.data // Use ?.data to access data safely
      )
    );
    return this.user;
  }

  getAllU(): Observable<{ key: string, data: User }[]> {
    return this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key,
          data: c.payload.val() as User
        })).filter(user => user.data.Confirmed === false)
      )
    );
  }
  removeUser(key: string): Promise<void> {
    return this.usersRef.remove(key);
  }

  confirmUser(key: string): Promise<void> {
    return this.usersRef.update(key, { Confirmed: true });
  }
  unconfirmUser(key: string): Promise<void> {
    return this.usersRef.update(key, { Confirmed: false });
  }
}
