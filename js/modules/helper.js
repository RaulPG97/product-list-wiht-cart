import { Product } from "../classes/Product.js";
const menuGrid = document.querySelector(".menu__grid");
const emptyCart = document.querySelector(".empty-cart");
const menu = document.querySelector(".menu");

const cart = document.querySelector(".cart");
const cartTitle = document.querySelector(".cart__title");
const cartOrder = document.querySelector(".cart__order");

export async function getProduct() {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error al cargar JSON:", error);
  }
}

export function createProductCard(product) {
  let Screen =
    screen.width < 1440 ? product.image.tablet : product.image.desktop;

  let imgSrc = screen.width <= 375 ? product.image.mobile : Screen;

  let productCard = document.createElement("article");
  productCard.classList = "product-card";
  productCard.id= product.id;

  //* Se creat la etiquet figure que contiene la imagen del producto y el boton para agregar al carrito

  let productCardImageContainer = document.createElement("figure");
  productCardImageContainer.classList = "product-card__image";

  //* imagen y boton
  let productCardImage = document.createElement("img");
  productCardImage.src = imgSrc;
  productCardImageContainer.appendChild(productCardImage);
  // *Botton basico
  let addToCartBtn = document.createElement("button");
  addToCartBtn.id = product.id;
  addToCartBtn.classList = "product-card__add-to-cart";
  let buttonImage = document.createElement("img");
  buttonImage.src = "./assets/images/icon-add-to-cart.svg";
  buttonImage.style.pointerEvents = "none";
  addToCartBtn.appendChild(buttonImage);
  addToCartBtn.append("Add to Cart");
  productCardImageContainer.appendChild(addToCartBtn);
  //*Boton activado

  let activeAdToCartBtn = document.createElement("button");
  activeAdToCartBtn.classList = "product-card__add-to-cart active";
  activeAdToCartBtn.id = product.id;

  let decreaseProductBtn = document.createElement("img");
  decreaseProductBtn.src = "./assets/images/icon-decrement-quantity.svg";
  decreaseProductBtn.classList = "decreaseProduct";
  activeAdToCartBtn.appendChild(decreaseProductBtn);

  let quantityText = document.createElement("p");
  quantityText.classList = "quantityText";

  let incrementProductBtn = document.createElement("img");
  incrementProductBtn.src = "./assets/images/icon-increment-quantity.svg";
  incrementProductBtn.classList = "incrementProduct";

  activeAdToCartBtn.appendChild(quantityText);
  activeAdToCartBtn.appendChild(incrementProductBtn);

  activeAdToCartBtn.style.display = "none";
  productCardImageContainer.appendChild(activeAdToCartBtn);

  // addEventClick(addToCartBtn);
  //* se crea la etiquta figcaption que contiene la informacion del producto.

  let productDetails = document.createElement("figcaption");
  productDetails.classList = "product-cart__details";

  let productCategory = document.createElement("p");
  productCategory.classList = "product-card__category";
  productCategory.innerText = product.category;

  let productName = document.createElement("h2");
  productName.classList = "product-card__name";
  productName.innerText = product.name;

  let productPrice = document.createElement("p");
  productPrice.classList = "product-card__price";
  productPrice.innerText = `$` + product.price;

  productDetails.appendChild(productCategory);
  productDetails.appendChild(productName);
  productDetails.appendChild(productPrice);

  productCard.appendChild(productCardImageContainer);
  productCard.appendChild(productDetails);

  menuGrid.append(productCard);

  return productCard;
}

export function createCartItemNode(productInCart) {
  let product = Product.products.find(
    (product) => product.id === productInCart.id
  );

  const cartItem = document.createElement("div");
  cartItem.classList = "cart__item";
  cartItem.id = productInCart.id;

  // *
  const cartItemInfo = document.createElement("div");
  cartItemInfo.classList = "cart__item-info";

  //*cart item details
  const carItemDetails = document.createElement("div");
  carItemDetails.classList = "cart__item-details";

  const cartItemName = document.createElement("p");
  cartItemName.classList = "cart__item-name";
  cartItemName.textContent = product.name;

  const cartItemQuantity = document.createElement("p");
  cartItemQuantity.classList = "cart__item-quantity";
  cartItemQuantity.textContent = `X${productInCart.quantity}`;
  cartItemQuantity.id = productInCart.id;
  const cartItemPrice = document.createElement("p");

  cartItemPrice.classList = "cart__item-price";
  cartItemPrice.textContent = `@ $${parseFloat(product.price)}`;
  cartItemPrice.id = productInCart.id;

  const cartItemTotal = document.createElement("p");
  cartItemTotal.classList = "cart__item-total";
  cartItemTotal.id = productInCart.id;
  cartItemTotal.textContent = `$${product.price * productInCart.quantity}`;

  carItemDetails.appendChild(cartItemName);
  carItemDetails.appendChild(cartItemQuantity);
  carItemDetails.appendChild(cartItemPrice);
  carItemDetails.appendChild(cartItemTotal);
  cartItemInfo.appendChild(carItemDetails);
  // *
  const removeFromCartBtn = document.createElement("button");
  removeFromCartBtn.classList = "cart__item-remove";
  const removeFromCartImg = document.createElement("img");
  removeFromCartImg.src = "./assets/images/icon-remove-item.svg";
  removeFromCartBtn.appendChild(removeFromCartImg);
  cartItemInfo.appendChild(removeFromCartBtn);

  const productSeparator = document.createElement("div");
  productSeparator.classList = "cart__item-separator";

  cartItem.appendChild(cartItemInfo);
  cartItem.appendChild(productSeparator);

  return cartItem;
}

export function switchToQuantityControls(triggerElement, active = false) {
  if (active) {
    triggerElement.target.style.display = "none";
    triggerElement.target.parentNode.querySelector(".active").style.display =
      "grid";
  } else {
    triggerElement.target.parentNode.style.display = "none";

    triggerElement.target.parentNode.parentNode.querySelector(
      ".product-card__add-to-cart"
    ).style.display = "flex";
  }
}

export function animateCartOnFirstItem() {
  emptyCart.style.display = "none";
  menu.style.animation = "bajarMenu 600ms ease-in-out ";
  cart.style.display = "grid";

  cart.style.animation = "subirCarro 1100ms ease-in-out forwards";

  setTimeout(() => {
    menu.style.zIndex = "10";
    cart.style.zIndex = "5";

    cart.style.gridRow = "1/2";
    menu.style.gridRow = " 2/3";
  }, 500);
}
