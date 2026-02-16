// services/productService.js
class ProductService {
  constructor() {
    this.apiBase = "http://localhost:5000/api";
    this.imageBase = "http://localhost:5000";
  }

  async getProducts() {
    try {
      const response = await fetch(`${this.apiBase}/products`);
      if (!response.ok) throw new Error("Failed to fetch products");
      return await response.json();
    } catch (error) {
      console.error("Error in getProducts:", error);
      return [];
    }
  }

  async getProductById(id) {
    try {
      const response = await fetch(`${this.apiBase}/products/${id}`);
      if (!response.ok) throw new Error("Failed to fetch product by id");
      return await response.json();
    } catch (error) {
      console.error("Error in getProductById:", error);
      return null;
    }
  }

  getImageUrl(filename) {
    // Example: http://localhost:5000/products/dumbbell.jpg
    return `${this.imageBase}${filename}`;
  }
}

export default new ProductService();
