import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from '../pages/home/home.component';
import { AdminDashboardComponent } from '../pages/admin-dashboard/admin-dashboard.component';
import { authGuard } from './auth.guard'; // Fix guard import
import { ProductListComponent } from '../components/product-list/product-list.component';
import { CartComponent } from '../components/cart/cart.component';
import { CheckoutComponent } from '../components/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Public Home Page
  {path:'home', component:HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent, canActivate: [authGuard] }, // Only Authenticated Users
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard] }, // Only Admins
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  
  { path: '**', redirectTo: 'login' }, // Redirect unknown routes to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
