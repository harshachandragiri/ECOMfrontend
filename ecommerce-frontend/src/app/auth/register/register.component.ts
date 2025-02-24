import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';  // ✅ Defined properly
  email: string = '';  // ✅ Defined properly
  password: string = '';  // ✅ Defined properly
  errorMessage: any = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    const success = await this.authService.register({ name: this.name, email: this.email, password: this.password });
    if (success) {
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Registration failed';
    }
  }
}
