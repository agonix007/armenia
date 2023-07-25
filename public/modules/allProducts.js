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

const account = document.getElementById("account");
const cart = document.getElementById("cartFeature");
const auth = document.getElementById("authentication");

const isLoggedIn = localStorage.getItem("username") !== null;
const userSection = document.getElementById("username");

if (isLoggedIn) {
  let username = localStorage.getItem("username");
  let firstname = username.split(" ")[0];

  userSection.innerText = `${firstname}`;
  account.style.display = "block";
  cart.style.display = "block";
} else {
  auth.classList.remove("authenticate");
  account.style.display = "none";
  cart.style.display = "none";
}

const logoutUser = async () => {
  try {
    const response = await fetch(config.url + "/auth/logout", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"), // Replace with the stored token
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      toastr.success("The Adventure Awaits");
      // Reloads the page
      setTimeout(() => {
        // location.reload();
        window.location.href = "/";
      }, 1500);
    } else {
      throw new Error("Internal server error");
    }
  } catch (error) {
    console.log(error.message);
    toastr.error(error.message);
  }
};

const logout = document.getElementById("logout");
logout.addEventListener("click", logoutUser);
