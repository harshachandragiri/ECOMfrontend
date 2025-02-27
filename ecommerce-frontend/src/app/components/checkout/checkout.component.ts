import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orderData = { name: '', address: '', phone: '' };
  cartItems: any[] = [];
  totalPrice = 0;
  userId: string | null = '';

  constructor(private cartService: CartService,
    private authService: AuthService,
    private http: HttpClient) { }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price, 0);
    this.userId = this.authService.getUserId(); // ✅ Get userId from AuthService
  }

  // placeOrder() {
  //   const orderDetails = {
  //     userId: this.userId,  // Replace with actual user ID
  //     items: this.cartItems,
  //     totalAmount: this.totalPrice,
  //   };

  //   this.http.post('http://localhost:8000/orders', orderDetails).subscribe(() => {
  //     alert('Order placed successfully!');
  //     this.cartService.clearCart();
  //   });
  // }
  placeOrder() {
    console.log('Placing order...'); // Debug: Check if function runs
  
    const userId = localStorage.getItem('userId'); // Get user ID from localStorage
    if (!userId) {
      alert('User ID not found! Please login again.');
      return;
    }
  
    const orderDetails = {
      userId: userId,
      items: this.cartItems,
      totalAmount: this.totalPrice,
    };
  
    console.log('Order Details:', orderDetails); // Debug: Check order details before sending
  
    this.http.post('http://localhost:8000/orders', orderDetails).subscribe({
      next: (response) => {
        console.log('Order Response:', response); // Debug: Log API response
        alert('Order placed successfully!');
        this.cartService.clearCart();
      },
      error: (error) => {
        console.error('Order Error:', error); // Debug: Log any error
        alert('Failed to place order. Check console for details.');
      }
    });
  }
  
}
