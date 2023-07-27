import config from "../config/config.js";

toastr.options = {
  positionClass: "toast-bottom-right",
  closeButton: true,
  progressBar: true,
  timeOut: 3000,
};

const addingAndRemovingCartItems = (items) => {
  const cartProducts = document.getElementById("cartItems");
  items.forEach((detail, i) => {
    const uniqueId = `product-${i}`;
    cartProducts.innerHTML += `<tr id="${uniqueId}">
              <td>
                <div class="cart-info">
                  <img
                    src="${detail.product.imageUrl}"
                    alt="${detail.product.pname}"
                  />
                  <div class="content">
                    <p class="pname">${detail.product.pname}</p>
                    <p class="price py-1">₹${detail.product.price}</p>
                    <span class="remove-product">Remove</span>
                  </div>
                </div>
              </td>
              <td>
                <input
                  type="number"
                  id="input1"
                  class="form-control cart-input"
                  value="${detail.quantity}"
                />
              </td>
              <td id="tprice-${uniqueId}" class="item-total-price">₹${
      detail.product.price * detail.quantity
    }</td>
            </tr>`;
  });

  const inputElements = document.querySelectorAll(".cart-input");
  inputElements.forEach((inputElement, i) => {
    inputElement.addEventListener("change", async function () {
      if (this.value < 1) {
        this.value = 1;
      }
      const uniqueId = `product-${i}`;

      const itemPrice = items[i].product.price;
      const inputValue = this.value;
      const totalPrice = inputValue * itemPrice;

      const tprice = document.getElementById(`tprice-${uniqueId}`);
      tprice.textContent = `₹${totalPrice}`;

      try {
        const response = await fetch("/api/cart", {
          method: "PATCH",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: items[i].product._id,
            quantity: parseInt(inputValue),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update product details");
        }

        // Recalculate the totalSummary after successful update
        const allTPrices = document.querySelectorAll(".item-total-price");
        let totalSummary = 0;
        allTPrices.forEach((tpriceElement) => {
          const priceValue = +tpriceElement.textContent.replace("₹", "");
          totalSummary += priceValue;
        });
        const totalSummaryElement = document.getElementById("totalSummary");
        totalSummaryElement.textContent = `₹${totalSummary}`;
      } catch (error) {
        console.log(error.message);
        toastr.error(error.message);
      }
    });
  });

  // Initial calculation of totalSummary after fetching data
  const allTPrices = document.querySelectorAll(".item-total-price");
  let totalSummary = 0;
  allTPrices.forEach((tpriceElement) => {
    const priceValue = +tpriceElement.textContent.replace("₹", "");
    totalSummary += priceValue;
  });
  const totalSummaryElement = document.getElementById("totalSummary");
  totalSummaryElement.textContent = `₹${totalSummary}`;

  // Removing products from cart
  const removeProducts = document.querySelectorAll(".remove-product");
  removeProducts.forEach((productItems, i) => {
    productItems.addEventListener("click", async function () {
      try {
        const response = await fetch("/api/cart", {
          method: "PATCH",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: items[i].product._id,
            quantity: 0,
          }),
        });

        location.reload();
        if (!response.ok) {
          throw new Error("Failed to remove product from cart");
        }
      } catch (error) {
        console.log(error.message);
        toastr.error(error.message);
      }
    });
  });
};

const getCartItems = async () => {
  try {
    const response = await fetch(`/api/cart`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    addingAndRemovingCartItems(data.cartItems);
    // updateCartIndicator(data.cartItems.length);
  } catch (error) {
    console.log(error.message);
    toastr.error(error.message);
  }
};

getCartItems();

// const updateCartIndicator = (count) => {
//   const cartIndicator = document.getElementById("cartIndicator");
//   cartIndicator.textContent = count > 10 ? "10+" : count.toString();
//   localStorage.setItem("cartValue", count);
// };

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
