import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  // Fetch all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
   // ✅ Get Product by ID
   getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${productId}`);
  }
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }
  
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }
  updateProduct(productId: number, updatedProduct: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${productId}`, updatedProduct);
  }
}
