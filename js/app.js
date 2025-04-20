import {
  getProduct,
  createProductCard,
  animateCartOnFirstItem,
  switchToQuantityControls,
  createCartItemNode,
  hideCartAnimation,
  displayCartTotal
} from "./modules/helper.js";
import { Product } from "./classes/Product.js";
import { Cart } from "./classes/Cart.js";

window.addEventListener("DOMContentLoaded", async () => {
 
  const cartOrder = document.querySelector(".cart__order");
  let productsNode;
  await Product.loadProducts();

  let product = new Product();
  let cart = new Cart();
  let productInCart;
  const loadProductsFromLocalStorage = cart.loadFromLocalStorage();
  cart.getCartSumary()
  if (loadProductsFromLocalStorage) {
    if (cart.hasItems == true) {
      animateCartOnFirstItem();
      cart.renderProductInCart(cart.products, cartOrder);
    }
  }

  product.displayProducts(Product.products);

  Product.ProductArticles.forEach((card) => {
    const addToCartButton = card.querySelector(".product-card__add-to-cart");
    const incrementProductBtn = card.querySelector(".incrementProduct");
    const decreaseProductBtn = card.querySelector(".decreaseProduct");
    const activeAddTocartBtn = card.querySelector(".active");
    let productQuantityText = card.querySelector(".quantityText");

    if (cart.productNodes[card.id]) {
      addToCartButton.style.display = "none";
      activeAddTocartBtn.style.display = "grid";

      let { quantity } = cart.products.find(
        (product) => (product.id == card.id)
      );

      activeAddTocartBtn.querySelector(".quantityText").textContent = quantity;
    }

    addToCartButton.addEventListener("click", (e) => {
      animateCartOnFirstItem();

      let productExist = Product.products.find(
        (product) => product.id === e.target.id
      );
      //! aqui deberia retornar un div con un error(por ahora solo hara el console.log y nada despues de eso)
      if (!productExist) {
        console.log("Product does not exist");
        return;
      }
      //! if: si guarda el carrito:
      //*guardo el carrotp actualizado en el local storage,
      //* renderizo el produccto en el carrito
      //*cambio los controles agregar al carrirto
      //*cambio el cantidad del producto en el boton de  agregar o restar del carrito
      productInCart = cart.adToCart(e.target.id);
      
      if (productInCart) {
        cart.saveToLocalStorage(cart.products);

        productsNode = createCartItemNode(productInCart);

        cart.renderProductInCart(productsNode, cartOrder);
        displayCartTotal(cart);
        switchToQuantityControls(e, true);

        productQuantityText.textContent = productInCart.quantity;
      }
    });

    decreaseProductBtn.addEventListener("click", (e) => {
      let productInCart = cart.decreaseCartItem(e.target.parentNode.id, e);

      if (!productInCart) {
        switchToQuantityControls(e, false);
        cart.saveToLocalStorage(cart.products);
        cart.removeFromCart(e.target.parentNode.id);

        if (cart.hasItems === false) {
          console.log(cart.hasItems);
          console.log(cart.products);
          
          hideCartAnimation()
        }
        
        return;
      }
      //*si el carrito esta vacio, esconder el carrito en el dom 
     

      cart.saveToLocalStorage(cart.products);
      productQuantityText.textContent = productInCart.quantity;
      //*render prueba
      cart.updateCartItemDetails(
        e.target.parentNode.id,
        productInCart.quantity
      );
      displayCartTotal(cart);
    });

    incrementProductBtn.addEventListener("click", (e) => {
      productInCart = cart.adToCart(e.target.parentNode.id);

      productQuantityText.textContent = productInCart.quantity;

      cart.saveToLocalStorage(cart.products);
      cart.updateCartItemDetails(
        e.target.parentNode.id,
        productInCart.quantity
      );
      displayCartTotal(cart);
    });
  });
});
