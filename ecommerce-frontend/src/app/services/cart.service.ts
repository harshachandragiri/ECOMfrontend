// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class CartService {
//   private cart: any[] = [];

//   addToCart(product: any) {
//     this.cart.push(product);
//   }

//   getCartItems() {
//     return this.cart;
//   }

//   clearCart() {
//     this.cart = [];
//   }
// }
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = [];

  constructor() {}

  addToCart(product: any) {
    this.cart.push(product);
    console.log('Cart:', this.cart);
  }

  getCartItems() {
    return this.cart;
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.id !== productId);
  }

  clearCart() {
    this.cart = [];
  }
}
