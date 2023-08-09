toastr.options = {
  positionClass: "toast-bottom-right",
  closeButton: true,
  progressBar: true,
  timeOut: 3000,
};

// Adding products in DataBase
const addingProducts = async (event) => {
  event.preventDefault();

  const pname = document.getElementById("pname").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const sprice = document.getElementById("sprice").value;
  const categories = document.getElementById("categories").value;
  const brand = document.getElementById("brand").value;
  const quantity = document.getElementById("quantity").value;
  const url = document.getElementById("url").value;

  const productData = {
    pname: pname,
    description: description,
    price: price,
    sprice: sprice,
    category: categories,
    brand: brand,
    quantity: quantity,
    imageUrl: url,
  };

  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    toastr.success("Product Added Successfully");
    if (!response.ok) {
      const errorMsg = await response.json();
      toastr.warning(errorMsg);
      return;
    }
  } catch (error) {
    console.error(error.message);
    toastr.error(error.message);
  }
};

const addProducts = document.getElementById("addProducts");
addProducts.addEventListener("submit", addingProducts);

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
