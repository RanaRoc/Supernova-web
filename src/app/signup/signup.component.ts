import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  signUp(): void {
    this.authService.signUp(this.email, this.password)
      .then(() => {
        console.log('Signed up successfully!');
        // Redirect or perform other actions after successful sign-up
      })
      .catch(error => {
        console.error('Sign up error:', error);
        this.errorMessage = error.message;
      });
  }
}
