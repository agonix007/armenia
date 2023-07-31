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


