import config from "../config/config.js";

toastr.options = {
  positionClass: "toast-bottom-right",
  closeButton: true,
  progressBar: true,
  timeOut: 3000,
};

const addingOrder = (items) => {
  const orderedItems = document.getElementById("orderedItems");
  items.forEach((product) => {
    const orderDate = new Date(product.orderedAt);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const indianTime = new Intl.DateTimeFormat("en-IN", options).format(
      orderDate
    );
    product.orderedItems.cartItems.reverse().forEach((item) => {
      const truncatedDescription = truncateTextByWords(
        item.product.description, 7);
      orderedItems.innerHTML += `
      <div class="product-section">
          <div class="product-image">
            <img src="${item.product.imageUrl}" alt="Product 1" />
          </div>
          <div class="product-details">
            <h2 class="product-name">${item.product.pname}</h2>
            <p class="product-description">
              <p>${truncatedDescription}</p><strong>Order date:</strong>
              ${indianTime}</p>
            <button type="button" class="btn btn-grad fw-bold">View</button>
          </div>
          </div>  
      `;
    });
  });
};

function truncateTextByWords(text, maxWords) {
  const words = text.split(" ");
  if (words.length <= maxWords) {
    return text;
  } else {
    const truncatedWords = words.slice(0, maxWords).join(" ");
    return truncatedWords + ". . . .";
  }
}

const getOrderedItems = async () => {
  try {
    const pOrder = document.getElementById("pOrder");
    const noOrder = document.getElementById("noOrder");
    const response = await fetch("/api/cart/orders");
    if (!response.ok) {
      const errorMsg = await response.json();
      noOrder.style.display = "block";
      console.log(errorMsg);
      return;
    }
    const data = await response.json();
    noOrder.style.display = "none";
    pOrder.style.display = "block";
    addingOrder(data.userCart.reverse());
  } catch (error) {
    console.log(error.message);
    toastr.error(error.message);
  }
};

getOrderedItems();

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
    const response = await fetch(config.url + "/auth/logout", {
      method: "GET",
      headers: {
        // Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      toastr.success("The Adventure Awaits");
      // Reloads the page
      setTimeout(() => {
        location.reload();
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
