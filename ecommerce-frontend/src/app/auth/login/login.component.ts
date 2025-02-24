import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']); // Redirect logged-in users
    }
  }

  // async onLogin() {
  //   // Validate Inputs
  //   if (!this.email.trim() || !this.password.trim()) {
  //     this.errorMessage = 'Email and password are required!';
  //     return;
  //   }
  
  //   try {
  //     const success = await this.authService.login({ email: this.email, password: this.password });
  
  //     if (success) {
  //       this.router.navigate(['/home']);
  //     } else {
  //       this.errorMessage = 'Invalid email or password';
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     this.errorMessage = 'Login failed. Please try again.';
  //   }
  // }
  async onLogin() {
    if (!this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Email and password are required!';
      return;
    }
  
    try {
      const success = await this.authService.login({ email: this.email, password: this.password });
  
      if (success) {
        this.router.navigate(['/products']);
      } else {
        this.errorMessage = 'Invalid email or password';
      }
    } catch (error) {
      console.error("Login error:", error);
      this.errorMessage = 'Login failed. Please try again.';
    }
  }
  
  
}
