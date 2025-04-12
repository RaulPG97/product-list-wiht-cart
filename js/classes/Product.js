import { getProduct, createProductCard } from "../modules/helper.js";
import { Cart } from "./Cart.js";

export class Product {
  static products = [];
  static ProductArticles = [];

  static async loadProducts() {
    const products = await getProduct();
    this.products = products;
  }

  displayProducts(products) {
    products.forEach((product) => {
      Product.ProductArticles.push(createProductCard(product));
    });
  }
}
