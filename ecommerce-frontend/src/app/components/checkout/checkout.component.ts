import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orderData = { name: '', address: '', phone: '' };
  cartItems: any[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  placeOrder() {
    const orderDetails = {
      userId: '123',  // Replace with actual user ID
      items: this.cartItems,
      totalAmount: this.totalPrice,
    };

    this.http.post('http://localhost:8000/orders', orderDetails).subscribe(() => {
      alert('Order placed successfully!');
      this.cartService.clearCart();
    });
  }
}
