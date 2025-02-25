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
// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../services/product.service';

// @Component({
//   selector: 'app-admin-dashboard',
//   templateUrl: './admin-dashboard.component.html',
//   styleUrls: ['./admin-dashboard.component.css'],
// })
// export class AdminDashboardComponent implements OnInit {
//   products: any[] = []; // Store fetched products
//   newProduct = { title: '', description: '', price: 0, imageUrl: '' };
//   editingProduct: any = null;

//   constructor(private productService: ProductService) {}

//   ngOnInit() {
//     this.loadProducts(); // Fetch products on component load
//   }

//   // Fetch Products
//   loadProducts() {
//     this.productService.getProducts().subscribe((data) => {
//       this.products = data;
//     });
//   }

//   // Add Product
//   addProduct() {
//     this.productService.addProduct(this.newProduct).subscribe(() => {
//       alert('Product added successfully!');
//       this.newProduct = { title: '', description: '', price: 0, imageUrl: '' };
//       this.loadProducts(); // Refresh product list
//     });
//   }
//   deleteProduct(productId: number) {
//     if (confirm('Are you sure you want to delete this product?')) {
//       this.productService.deleteProduct(productId).subscribe(() => {
//         alert('Product deleted successfully!');
//         this.loadProducts(); // Refresh list after deletion
//       });
//     }
//   }
 

// editProduct(product: any) {
//   this.editingProduct = { ...product }; // Clone product for editing
// }

// updateProduct() {
//   this.productService.updateProduct(this.editingProduct.id, this.editingProduct).subscribe(() => {
//     alert('Product updated successfully!');
//     this.editingProduct = null;
//     this.loadProducts(); // Refresh list
//   });
// }

// cancelEdit() {
//   this.editingProduct = null;
// }

// 
// Updated admin-dashboard.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../../services/product.service';

// @Component({
//   selector: 'app-admin-dashboard',
//   templateUrl: './admin-dashboard.component.html',
//   styleUrls: ['./admin-dashboard.component.css'],
// })
// export class AdminDashboardComponent implements OnInit {
//   products: any[] = []; // Store fetched products
//   newProduct = { title: '', description: '', price: 0, image: '' };
//   editingProduct: any = null;

//   constructor(private productService: ProductService) {}

//   ngOnInit() {
//     this.loadProducts();
//   }

//   l// oadProducts() {
//    //  const storedProducts = localStorage.getItem('modifiedProducts');
//    //  this.productService.getProducts().subscribe((data) => {
//    //    let apiProducts = data;
//    //    if (storedProducts) {
//    //      const localUpdates = JSON.parse(storedProducts);
//    //      apiProducts = apiProducts.map((product: any) => {
//    //        const updatedProduct = localUpdates.find((p: any) => p.id === product.id);
//    //        return updatedProduct ? updatedProduct : product;
//    //      }).filter((product: any) => !product.deleted);
//    //    }
//    //    this.products = apiProducts;
//    //  });
//   }// 
//   loadProducts() {
//      onst storedProducts = localStorage.getItem('modifiedProducts');
//      his.productService.getProducts().subscribe((data) => {
//        et apiProducts = data;
//        onsole.log('Fetched API Products:', apiProducts); // Debugging line ✅
  
//        f (storedProducts) {
//          onst localUpdates = JSON.parse(storedProducts);
//          piProducts = apiProducts.map((product: any) => {
//            onst updatedProduct = localUpdates.find((p: any) => p.id === product.id);
//            eturn updatedProduct ? updatedProduct : product;
//          ).filter((product: any) => !product.deleted);
       
  
//        onsole.log('Final Products After Merge:', apiProducts); // Debugging line ✅
//        his.products = apiProducts;
//      );
// }  
  

//   addProduct() {
//     const storedProducts = JSON.parse(localStorage.getItem('modifiedProducts') || '[]');
//     const newId = storedProducts.length ? storedProducts[storedProducts.length - 1].id + 1 : 1000;
//     const productToAdd = { ...this.newProduct, id: newId };
//     storedProducts.push(productToAdd);
//     localStorage.setItem('modifiedProducts', JSON.stringify(storedProducts));
//     this.newProduct = { title: '', description: '', price: 0, image: '' };
//     this.loadProducts();
//   }

//   deleteProduct(productId: number) {
//     if (confirm('Are you sure you want to delete this product?')) {
//       const storedProducts = JSON.parse(localStorage.getItem('modifiedProducts') || '[]');
//       const updatedProducts = storedProducts.map((p: any) =>
//         p.id === productId ? { ...p, deleted: true } : p
//       );
//       localStorage.setItem('modifiedProducts', JSON.stringify(updatedProducts));
//       this.loadProducts();
//     }
//   }

//   editProduct(product: any) {
//     this.editingProduct = { ...product };
//   }

//   u// pdateProduct() {
//    //  let storedProducts = JSON.parse(localStorage.getItem('modifiedProducts') || '[]');
//    //  const index = storedProducts.findIndex((p: any) => p.id === this.editingProduct.id);
//    //  if (index !== -1) {
//    //    storedProducts[index] = { ...this.editingProduct };
//    //  } else {
//    //    storedProducts.push({ ...this.editingProduct });
//    //  }
//    //  localStorage.setItem('modifiedProducts', JSON.stringify(storedProducts));
//    //  this.editingProduct = null;
//    //  this.loadProducts();
//   }// 
//   updateProduct() {
//     let storedProducts = JSON.parse(localStorage.getItem('modifiedProducts') || '[]');
//     const index = storedProducts.findIndex((p: any) => p.id === this.editingProduct.id);
  
//     if (index !== -1) {
//       storedProducts[index] = { ...this.editingProduct };
//     } else {
//       storedProducts.push({ ...this.editingProduct });
//     }
  
//     localStorage.setItem('modifiedProducts', JSON.stringify(storedProducts));
  
//     console.log('Updated LocalStorage:', localStorage.getItem('modifiedProducts')); // ✅ Debugging line
//     this.editingProduct = null;
//     this.loadProducts(); // ✅ Refresh UI
//   }
  
  
 

//   cancelEdit() {
//     this.editingProduct = null;
//   }

//   handleFileInput(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.newProduct.image = e.target.result;
//       };
//       reader.readAsDataURL(file);
//     }
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
      const storedProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
      const deletedProducts = JSON.parse(localStorage.getItem('deletedProducts') || '[]');
      
      this.products = [...data, ...storedProducts].filter(product => !deletedProducts.includes(product.id));
    });
  }

  // Add Product (Local Storage)
  addProduct() {
    const storedProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
    const newId = storedProducts.length ? Math.max(...storedProducts.map((p: any) => p.id)) + 1 : 1000;
    const newProduct = { ...this.newProduct, id: newId };
    storedProducts.push(newProduct);
    localStorage.setItem('customProducts', JSON.stringify(storedProducts));
    alert('Product added successfully!');
    this.newProduct = { title: '', description: '', price: 0, imageUrl: '' };
    this.loadProducts(); // Refresh product list
  }

  // Soft Delete Product
  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      const deletedProducts = JSON.parse(localStorage.getItem('deletedProducts') || '[]');
      deletedProducts.push(productId);
      localStorage.setItem('deletedProducts', JSON.stringify(deletedProducts));
      alert('Product deleted successfully!');
      this.loadProducts(); // Refresh list after deletion
    }
  }
 
  // // Edit Product
  // editProduct(product: any) {
  //   this.editingProduct = { ...product }; // Clone product for editing
  // }
  editProduct(product: any) {
    this.editingProduct = product; // Directly assign the product reference
  }
  


  // Update Product
  // updateProduct() {
  //   let storedProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');
  //   const index = storedProducts.findIndex((p: any) => p.id === this.editingProduct.id);
  //   if (index !== -1) {
  //     storedProducts[index] = { ...this.editingProduct };
  //   } else {
  //     storedProducts.push(this.editingProduct);
  //   }
  //   localStorage.setItem('customProducts', JSON.stringify(storedProducts));
  //   alert('Product updated successfully!');
  //   this.editingProduct = null;
  //   this.loadProducts(); // Refresh list
  // }
  updateProduct() {
    let storedProducts = JSON.parse(localStorage.getItem('customProducts') || '[]');

    // Find and update the product in local storage
    storedProducts = storedProducts.map((p: any) => 
        p.id === this.editingProduct.id ? { ...this.editingProduct } : p
    );

    localStorage.setItem('customProducts', JSON.stringify(storedProducts));

    this.loadProducts(); // Refresh product list
    alert('Product updated successfully!');
    this.editingProduct = null; // Reset editing mode
}


  // File Upload
  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (this.editingProduct) {
          this.editingProduct.imageUrl = reader.result as string;
        } else {
          this.newProduct.imageUrl = reader.result as string;
        }
      };
    }
  }

  cancelEdit() {
    this.editingProduct = null;
  }
}