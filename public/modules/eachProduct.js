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
            <p class="stock" id="stockStatus">In Stock</p>
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

  const stockStatus = document.getElementById("stockStatus");
  const quantityInStock = data.quantity;

  if (quantityInStock <= 0) {
    stockStatus.textContent = "Out of Stock";
    stockStatus.classList.add("red-text");
  } else if (quantityInStock <= 10) {
    stockStatus.textContent = quantityInStock + " items left in Stock";
    stockStatus.classList.add("red-text");
  }
};

const addToCart = async () => {
  try {
    const productData = await fetch(`/api/products/${productId}`);
    if (productData.ok !== true) {
      throw new Error("Failed to load from backend.");
    }
    const data = await productData.json();
    if(data.quantity <=0){
      throw new Error("Product is out of stock");
    }

    const product = {
      productId: productId,
      quantity: 1,
    };
    const response = await fetch(`/api/cart`, {
      method: "POST",
      headers: {
        // Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const errorMsg = await response.json();
      toastr.warning(errorMsg);
      return;
    }
    toastr.success("Product added to cart successfully");
    location.reload();
  } catch (error) {
    console.log(error.message);
    if (error.message === "Product is out of stock"){
      toastr.warning(error.message);
      return
    }
    toastr.info("Please login to join the journey");
  }
};

const getProductDetails = async (productId) => {
  try {
    const response = await fetch(`/api/products/${productId}`);
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

// admin panel rendering in header
const adminPanel = async () => {
  const adminPanelLink = document.getElementById("adminPanelLink");
  const response = await fetch("/api/account");
  const data = await response.json();
  if (data.bio === "Admin") {
    adminPanelLink.style.display = "block";
  }
};
adminPanel();

const logoutUser = async () => {
  try {
    const response = await fetch("/api/auth/logout");
    if (response.ok) {
      localStorage.removeItem("username");
      toastr.success("The Adventure Awaits");

      setTimeout(() => {
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
