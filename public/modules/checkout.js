toastr.options = {
  positionClass: "toast-bottom-right",
  closeButton: true,
  progressBar: true,
  timeOut: 3000,
};

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
  if (addMoney === "" || addMoney === undefined) {
    walletModal.style.display = "none";
    return;
  }

  const money = {
    walletMoney: addMoney,
  };

  try {
    const response = await fetch("/api/account", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(money),
    });
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

const getTotalPrice = async () => {
  try {
    const response = await fetch("/api/cart");
    const cartData = await response.json();

    const itemPrice = document.getElementById("itemPrice");
    itemPrice.textContent = cartData.total.toLocaleString("en-IN");
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.textContent = cartData.total.toLocaleString("en-IN");
  } catch (error) {
    console.log(error.message);
    toastr.error(error.message);
  }
};
getTotalPrice();

const checkout = async () => {
  const loader = document.getElementById("loader");

  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const zip = document.getElementById("zip").value;

  const fullAddress = {
    address: address,
    city: city,
    state: state,
    zip: zip,
  };

  try {
    loader.style.display = "block";

    const response1 = await fetch("/api/cart/checkout", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response2 = await fetch("/api/account", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullAddress),
    });
    if (!response1.ok) {
      const errorMsg = await response1.json();
      toastr.warning(errorMsg);
      return;
    }
    if (!response2.ok) {
      const errorMsg = await response2.json();
      toastr.warning(errorMsg);
      return;
    }
    toastr.success("Ordered Successful");

    // Redirect to home page after a short delay
    setTimeout(() => {
      window.location.href = "/successful";
    }, 1500);
  } catch (error) {
    console.log(error.message);
    toastr.error(error.message);
  } finally {
    loader.style.display = "none";
  }
};

const checkoutBtn = document.getElementById("checkoutBtn");
checkoutBtn.addEventListener("click", checkout);
