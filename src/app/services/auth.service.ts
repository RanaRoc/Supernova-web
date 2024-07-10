// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {
    this.setPersistence();
  }

  private async setPersistence() {
    try {
      await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      console.log('Persistence set to LOCAL');
    } catch (error) {
      console.error('Error setting persistence:', error);
    }
  }

  async signIn(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Signed in:', userCredential.user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  getAuthState() {
    return this.afAuth.authState;
  }
}
