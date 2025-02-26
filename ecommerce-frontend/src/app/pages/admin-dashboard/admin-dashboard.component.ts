import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  products: any[] = [];
  newProduct = { title: '', description: '', price: 0, imageUrl: '' };
  editingProduct: any = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  // ✅ Fetch Products (API + LocalStorage Merge)
  loadProducts() {
    this.productService.getProducts().subscribe({
        next: (apiProducts) => {
            const storedProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');

            // Normalize stored products: Ensure imageUrl is mapped to image
            const formattedStoredProducts = storedProducts.map((product: any) => ({
                ...product,
                image: product.imageUrl || product.image // ✅ Ensure consistency
            }));

            // Merge API & local products, filter out soft-deleted ones
            this.products = [...apiProducts, ...formattedStoredProducts].filter((p) => !p.deleted);

            console.log('Products loaded successfully:', this.products);
        },
        error: (err) => {
            console.error('Error fetching products:', err);
            alert('Failed to load products. Please try again later.');
        }
    });
}


  // ✅ Add Product (LocalStorage)
  addProduct() {
    console.log("Product Before Adding:", this.newProduct); // ✅ Debugging

    // Validate required fields
    if (!this.newProduct.title || !this.newProduct.description || !this.newProduct.price || !this.newProduct.imageUrl) {
        alert('Please fill in all product details, including an image.');
        return;
    }

    let storedProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
    const newId = storedProducts.length ? Math.max(...storedProducts.map((p: any) => p.id)) + 1 : 1000;

    // Ensure price is stored as a number
    const newProduct = {
      id: newId,
      title: this.newProduct.title.trim(),
      description: this.newProduct.description.trim(),
      price: parseFloat(this.newProduct.price.toString()),
      image: this.newProduct.imageUrl.trim()  // Ensure imageUrl is stored as 'image'
    };
    
  

    console.log("Adding Product:", newProduct); // ✅ Debugging

    storedProducts.push(newProduct);
    localStorage.setItem('customProducts', JSON.stringify(storedProducts));

    alert('Product added successfully!');

    // ✅ Reset form fields properly
    this.newProduct = { title: '', description: '', price: 0, imageUrl: '' };
;

    this.loadProducts();
}



  // ✅ Soft Delete Product (Mark as deleted)
  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      let storedProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');

      storedProducts = storedProducts.map((p: any) => 
        p.id === productId ? { ...p, deleted: true } : p
      );

      localStorage.setItem('customProducts', JSON.stringify(storedProducts));
      alert('Product deleted successfully!');
      this.loadProducts();
    }
  }
  isProductDeleted(productId: number): boolean {
    const deletedProducts = JSON.parse(localStorage.getItem('deletedProducts') || '[]');
    return deletedProducts.includes(productId);
}



  // ✅ Edit Product
  editProduct(product: any) {
    console.log('Editing Product:', product);
    this.editingProduct = { ...product };
  }
  
  // ✅ Update Product
  updateProduct() {
    let storedProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');

    storedProducts = storedProducts.map((p: any) => 
      p.id === this.editingProduct.id ? { ...this.editingProduct } : p
    );

    localStorage.setItem('customProducts', JSON.stringify(storedProducts));
    alert('Product updated successfully!');
    this.editingProduct = null;
    this.loadProducts();
  }

  // ✅ File Upload
  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (!file) {
        console.error("No file selected!");
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        this.newProduct.imageUrl = reader.result as string; // ✅ Auto-update imageUrl
    };
    reader.readAsDataURL(file);
}





  cancelEdit() {
    this.editingProduct = null;
  }
}
