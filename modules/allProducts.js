// const config = require("../config/config");
import config from "../config/config.js";

toastr.options = {
  positionClass: "toast-bottom-right",
  closeButton: true,
  progressBar: true,
  timeOut: 3000,
};

const addingProducts = (data, isLoading) => {
  const allProducts = document.getElementById("allProducts");
  const loader = document.getElementById("loader");

  if (isLoading) {
    loader.style.display = "block"; // Show the loader
  } else {
    loader.style.display = "none"; // Hide the loader

    // Generate the HTML for each product
    data.forEach((product) => {
      allProducts.innerHTML += `  <div class="col-3">
                  <div
                    class="imgBox d-flex justify-content-center align-items-center" onclick="showProductDetails('${product._id}')"
                  >
                    <img src=${product.imageUrl} alt=${product.pname} />
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
  }
};

const getProducts = async () => {
  try {
    addingProducts([], true); // Show the loader

    const response = await fetch(config.url + `/products`);
    if (response.ok !== true) {
      throw new Error("Failed to load from backend.");
    }
    const data = await response.json();
    addingProducts(data, false);
  } catch (error) {
    console.log(error.message);
    toastr.error(error.message);
  }
};

getProducts();
