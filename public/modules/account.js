import config from "../config/config.js";

toastr.options = {
  positionClass: "toast-bottom-right",
  closeButton: true,
  progressBar: true,
  timeOut: 3000,
};


//MODAL POP_UP
// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("updateButton");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};
// When the user clicks on <span> (x) or the "Cancel" button, close the modal
function closeModal() {
  modal.style.display = "none";
}
span.onclick = closeModal;

var cancelBtn = document.getElementById("cancelBtn");
cancelBtn.onclick = closeModal;
// Handle form submission
var submitBtn = document.getElementById("submitBtn");
submitBtn.onclick = function () {
  var address = document.getElementById("address").value;
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  var zipCode = document.getElementById("zipCode").value;
  // You can process the data here or send it to a server using AJAX, etc.
  console.log("Address: " + address);
  console.log("City: " + city);
  console.log("State: " + state);
  console.log("Zip Code: " + zipCode);
  // Close the modal after submitting
  closeModal();
};

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
