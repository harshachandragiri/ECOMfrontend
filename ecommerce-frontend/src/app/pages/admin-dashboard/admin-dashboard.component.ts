// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../services/product.service';

// @Component({
//   selector: 'app-admin-dashboard',
//   templateUrl: './admin-dashboard.component.html',
//   styleUrls: ['./admin-dashboard.component.css'],
// })
// export class AdminDashboardComponent implements OnInit {
//   newProduct = { title: '', description: '', price: 0,imageUrl: ''};

//   constructor(private productService: ProductService) {}

//   ngOnInit() {}

//   addProduct() {
//     this.productService.addProduct(this.newProduct).subscribe(() => {
//       alert('Product added successfully!');
//       this.newProduct = { title: '', description: '', price: 0, imageUrl: '' };
//     });
//   }

  
// }
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  products: any[] = []; // Store fetched products
  newProduct = { title: '', description: '', price: 0, imageUrl: '' };
  editingProduct: any = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts(); // Fetch products on component load
  }

  // Fetch Products
  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  // Add Product
  addProduct() {
    this.productService.addProduct(this.newProduct).subscribe(() => {
      alert('Product added successfully!');
      this.newProduct = { title: '', description: '', price: 0, imageUrl: '' };
      this.loadProducts(); // Refresh product list
    });
  }
  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        alert('Product deleted successfully!');
        this.loadProducts(); // Refresh list after deletion
      });
    }
  }
 

editProduct(product: any) {
  this.editingProduct = { ...product }; // Clone product for editing
}

updateProduct() {
  this.productService.updateProduct(this.editingProduct.id, this.editingProduct).subscribe(() => {
    alert('Product updated successfully!');
    this.editingProduct = null;
    this.loadProducts(); // Refresh list
  });
}

cancelEdit() {
  this.editingProduct = null;
}

}
