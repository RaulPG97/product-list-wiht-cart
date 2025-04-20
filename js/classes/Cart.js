import {
  animateCartOnFirstItem,
  createCartItemNode,
} from "../modules/helper.js";
import { Product } from "./Product.js";

export class Cart {
  constructor(products, hasItems, productNodes) {
    this.products = [];
    this.hasItems = false;
    this.productNodes = {};
  }

  adToCart(id) {
    let productInCart = this.products.find((product) => product.id === id);

    if (productInCart) {
      productInCart.quantity += 1;

      console.log(this.products);
      return productInCart;
    } else {
      let newProductIncart = {
        id: id,
        quantity: 1,
      };

      this.products.push(newProductIncart);
      console.log(this.products);

      this.saveToLocalStorage(this.products);
      return newProductIncart;
    }
  }

  decreaseCartItem(id, target) {
    let productInCart = this.products.find((product) => product.id === id);

    if (productInCart.quantity > 1) {
      productInCart.quantity -= 1;
      console.log(this.products);

      return productInCart;
    } else {
      this.products = this.products.filter((product) => product.id != id);
      this.hasItems = this.products.length > 0;

      if (!this.hasItems) {
        console.log(this.products);

        return;
      }
    }
  }

  saveToLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  loadFromLocalStorage() {
    let cartProducts = JSON.parse(localStorage.getItem("cart"));

    if (cartProducts == null || cartProducts.length == 0) {
      console.log("Error al cargar los productos");

      this.hasItems = false;
      return;
    }

    this.hasItems = true;
    this.products = cartProducts;

    return true;
  }

  updateCartItemDetails(productNodeId, quantity) {
    //!if: si recibo una ID valida
    if (!this.productNodes[productNodeId]) {
      return console.log("No se encontro el producto buscado");
    }
    //*obtener el las propiedaders del nodo a actualizar
    let productQuantity = this.productNodes[productNodeId].querySelector(
      ".cart__item-quantity"
    );
    let productTotal =
      this.productNodes[productNodeId].querySelector(".cart__item-total");
    //*obtener los datos del producto
    let { price } = Product.products.find(
      (product) => product.id === productNodeId
    );
    console.log(productTotal);
    //*actualizar las propiedades
    productQuantity.textContent = "X" + quantity;
    productTotal.textContent = "$" + (quantity * price).toFixed(2);
  }
  renderProductInCart(product, parentContainer) {
    if (!Array.isArray(product)) {
      if (!this.productNodes[product.id]) {
        this.productNodes[product.id] = product;

        console.log(this.productNodes);

        parentContainer.appendChild(product);
        return;
      }
      return;
    }

    product.forEach((element) => {
      const productNode = createCartItemNode(element);
      console.log(productNode);

      if (this.productNodes[element.id]) {
        console.log("Product redndered in cart");
        return false;
      } else {
        this.productNodes[element.id] = productNode;
        console.log(this.productNodes);

        parentContainer.appendChild(productNode);
      }
    });
  }
  removeFromCart(productNodeId) {
    this.productNodes[productNodeId].remove();
    delete this.productNodes[productNodeId];
    console.log(this.productNodes);
  }
  getCartSumary(){

    let cartSumary = {};
    let orderTotal = 0;
    this.products.forEach(cartProduct =>{
      let product = Product.products.find(product => product.id === cartProduct.id);
      // console.log(product);
      
      cartSumary[cartProduct.id] = {
        "name": product.name,
        "quantity" : cartProduct.quantity,
        "price" : product.price.toFixed(2),
        "itemTotal" : (cartProduct.quantity * product.price).toFixed(2)
      }
     
      orderTotal += parseFloat(cartSumary[cartProduct.id].itemTotal);
    });
    cartSumary["orderTotal"] = orderTotal.toFixed(2);
    console.log(cartSumary);
    
    return cartSumary;
  }

}
