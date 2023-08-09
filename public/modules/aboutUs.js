toastr.options = {
  positionClass: "toast-bottom-right",
  closeButton: true,
  progressBar: true,
  timeOut: 3000,
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

// admin panel rendering in header
const adminPanel = async () => {
  const adminPanelLink = document.getElementById("adminPanelLink");
  const response = await fetch("/api/account");
  const data = await response.json();
  if(data.bio === "Admin"){
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
