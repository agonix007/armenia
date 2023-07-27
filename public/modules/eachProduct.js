import config from "../config/config.js";

toastr.options = {
  positionClass: "toast-bottom-right",
  closeButton: true,
  progressBar: true,
  timeOut: 3000,
};

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

const addingData = (data) => {
  document.title = data.pname;
  const productData = document.getElementById("productData");
  productData.innerHTML = `<div
            class="col-6 d-flex flex-column align-items-center justify-content-center left"
          >
            <div class="w-75 left-content">
              <p>Category>&nbsp;<span class="category">${data.category}</span></p>
            </div>
            <div
              class="imgBox d-flex align-items-center justify-content-center"
            >
              <img
                src=${data.imageUrl}
                alt=${data.pname}
              />
            </div>
          </div>
          <div class="col-6 py-5 right">
            <p class="brandName">
              Brand: <span class="text-uppercase brand">${data.brand}</span>
            </p>
            <h2 class="fs-1 text-capitalize mb-0 pname">
              ${data.pname}
            </h2>
            <p class="stock">In Stock</p>
            <h6 class="specialPrice mb-1">Special Price</h6>
            <div class="d-flex align-items-center content">
              <p class="fs-3">&#x20B9;<span class="price">${data.price}</span>&ensp;</p>
              <p class="fs-5 strike">&#x20B9;${data.sprice}</p>
              <span class="ofr">&emsp;35%off</span>
            </div>
            <div class="mt-3">
              <p class="fw-bold mb-2 des">Description:</p>
              <p class="pe-5 description">
                ${data.description}
              </p>
            </div>
            <button
              type="submit"
              class="btn btn-grad fw-bold text-white w-100 mt-3"
              id="addToCartButton"
            >
              Add to Cart<i class="fa-solid fa-cart-shopping ps-3"></i>
            </button>
          </div>`;
  const addToCartButton = document.getElementById("addToCartButton");
  addToCartButton.addEventListener("click", () => addToCart());
};

function addToCart() {
  console.log(productId);
  const product = {
    productId: productId,
    quantity: 1,
  }
  console.log(product);
}

const getProductDetails = async (productId) => {
  try {
    const response = await fetch(config.url + `/products/${productId}`);
    if (response.ok !== true) {
      throw new Error("Failed to load from backend.");
    }
    const data = await response.json();
    addingData(data);
  } catch (error) {
    console.log(error.message);
  }
};

getProductDetails(productId);

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
