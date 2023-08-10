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
      const truncatePname = truncateTextByWords(product.pname, 2);
      let stockStatus = "";
      let stockStatusClass = "";
      if (product.quantity <= 0) {
        stockStatus = "Out of Stock";
        stockStatusClass = "red-text";
      } else if (product.quantity <= 10) {
        stockStatus = `${product.quantity} items left`;
        stockStatusClass = "red-text"; // Apply red text color
      } else {
        stockStatus = "In Stock";
      }

      allProducts.innerHTML += `  <div class="col-3">
                  <div
                    class="imgBox d-flex justify-content-center align-items-center" onclick="showProductDetails('${product._id}')"
                  >
                    <img src=${product.imageUrl} alt=${product.pname} />
                  </div>
                  <div class="content p-2 pt-3">
                    <p class="text-capitalize brand mb-0 fw-bold">${product.brand}</p>
                    <p class="pname mb-1 fs-5">${truncatePname}</p>
                    <p class="m-0 ${stockStatusClass}">${stockStatus}</p>
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

function truncateTextByWords(text, maxWords) {
  const words = text.split(" ");
  if (words.length <= maxWords) {
    return text;
  } else {
    const truncatedWords = words.slice(0, maxWords).join(" ");
    return truncatedWords + "...";
  }
}

const getProducts = async () => {
  try {
    addingProducts([], true); // Show the loader

    const response = await fetch(`/api/products`);
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
