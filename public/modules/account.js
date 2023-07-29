import config from "../config/config.js";

toastr.options = {
  positionClass: "toast-bottom-right",
  closeButton: true,
  progressBar: true,
  timeOut: 3000,
};

//Address setting MODAL POP_UP
// Get the modal
const modal = document.getElementById("myModal");
// Get the button that opens the modal
const btn = document.getElementById("updateButton");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};
// When the user clicks on <span> (x) or the "Cancel" button, close the modal
function closeModal() {
  modal.style.display = "none";
}
span.onclick = closeModal;

const cancelBtn = document.getElementById("cancelBtn");
cancelBtn.onclick = closeModal;
// Handle form submission
const updateData = async (event) => {
  event.preventDefault();

  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const zip = document.getElementById("zipCode").value;

  const fullAddress = {
    address: address,
    city: city,
    state: state,
    zip: zip,
  };

  try {
    const response = await fetch("/api/account", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullAddress),
    });
    if (!response.ok) {
      const errorMsg = await response.json();
      toastr.error(errorMsg);
      return;
    }
    toastr.success("Updated Successfully");
    // Reloads the page
    setTimeout(() => {
      location.reload();
    }, 1000);
  } catch (error) {
    console.error(error.message);
    toastr.error(error.message);
  }

  closeModal();
};

const updateAddress = document.getElementById("updateAddress");
updateAddress.addEventListener("submit", updateData);

// walletMoney Setting Modal
const walletModal = document.getElementById("walletModal");

// Get the button that opens the modal
const openModalBtn = document.getElementById("openModalBtn");

// Get the button that adds money
const addMoneyBtn = document.getElementById("addMoneyBtn");

// Get the button that cancels the modal
const cancelModal = document.getElementById("cancelModal");

// When the "Add amount" button is clicked, open the modal
openModalBtn.addEventListener("click", function () {
  walletModal.style.display = "block";
});

// When the "ADD Money" button is clicked, add the money and close the modal
addMoneyBtn.addEventListener("click", async function () {
  const addMoney = document.getElementById("addMoney").value;

  const money = {
    walletMoney: addMoney
  }

  try {
    const response = await fetch("/api/account", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(money),
    });
    const data = await response.json();
    console.log(data)
    if (!response.ok) {
      const errorMsg = await response.json();
      toastr.error(errorMsg);
      return;
    }
    toastr.success("Amount Added Successfully");
    // Reloads the page
    setTimeout(() => {
      location.reload();
    }, 1000);
  } catch (error) {
    console.error(error.message);
    toastr.error(error.message);
  }

  walletModal.style.display = "none";
});

// When the "Cancel" button is clicked, close the modal without adding money
cancelModal.addEventListener("click", function () {
  walletModal.style.display = "none";
});

const logoutAllDevices = async () => {
  try {
    const response = await fetch("/api/auth/logoutall");
    if (!response.ok) {
      throw new Error("Internal server error");
      return;
    }
    localStorage.removeItem("username");
    toastr.success("The Adventure Awaits");
    // Reloads the page
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  } catch (error) {
    console.log(error.message);
    toastr.error(error.message);
  }
};

const logoutAll = document.getElementById("logoutAll");
logoutAll.addEventListener("click", logoutAllDevices);

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
