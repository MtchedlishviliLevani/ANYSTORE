const urlParams = new URLSearchParams(window.location.search);
const productParams = urlParams.get("product");
const product = JSON.parse(decodeURIComponent(productParams));

let title = document.querySelector(".title");
title.textContent = product.title;
let brand = document.querySelector(".brand");
brand.textContent = `Brand  -  ${product.brand}`;
let main_image = document.querySelector(".main-image");
main_image.src = product.thumbnail;
let description = document.querySelector(".description");
description.textContent = `Description - ${product.description}`;
let category = document.querySelector(".category");
category.textContent = `Category - ${product.category}`;
let stock = document.querySelector(".stock");
stock.textContent = `Stock - ${product.stock}`;
let rate = document.querySelector(".raiting");
rate.textContent = `Rating - ${product.rating}`;
let price = document.querySelector(".price");
price.textContent = `${product.price} ₾`;
let discount = document.querySelector(".discount");
discount.textContent = `Discount - ${product.discountPercentage}%`;

product.images.forEach((image) => {
  console.log(image);
  const imageElement = document.createElement("img");
  const small_images = document.querySelector(".small-images");
  small_images.appendChild(imageElement);
  imageElement.src = image;
});
const head_title = document.head.querySelector("title");
head_title.textContent = `ANYSTORE || ${product.title}`;
