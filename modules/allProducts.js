// const config = require("../config/config");
import config from "../config/config.js";

const addingProducts = (data) => {
  data.forEach((product) => {
    const allProducts = document.getElementById("allProducts");
    allProducts.innerHTML += `  <div class="col-3">
                <div
                  class="imgBox d-flex justify-content-center align-items-center"
                >
                  <img src=${product.imageUrl} alt="product" />
                </div>
                <div class="content p-2 pt-3">
                  <p class="text-capitalize brand mb-0 fw-bold">${product.brand}</p>
                  <p class="pname mb-1 fs-5">${product.pname}</p>
                  <p class="price fw-bold fs-3 mb-2">&#x20B9;${product.price}</p>
                  <div class="star-rating mb-3">
                    <ul class="list-inline">
                      <li class="list-inline-item">
                        <i class="fa-solid fa-star"></i>
                      </li>
                      <li class="list-inline-item">
                        <i class="fa-solid fa-star"></i>
                      </li>
                      <li class="list-inline-item">
                        <i class="fa-solid fa-star"></i>
                      </li>
                      <li class="list-inline-item">
                        <i class="fa-solid fa-star"></i>
                      </li>
                      <li class="list-inline-item">
                        <i class="fa-regular fa-star"></i>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>`;
  });
};

const getProducts = async () => {
  try {
    const response = await fetch(config.url + `/products`);
    const data = await response.json();
    addingProducts(data);
  } catch (error) {
    console.log(error);
  }
};

getProducts();
