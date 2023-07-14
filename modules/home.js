import config from "../config/config.js";

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

const cook = document.cookie;
console.log(cook);

const logoutUser = async () => {
    try {
       const response = await fetch(config.url + "/auth/logout");
       localStorage.removeItem("username");
       location.reload();
       console.log(response);
    } catch (error) {
        console.log(error.message);
    }
};

const logout = document.getElementById("logout");
logout.addEventListener("click", logoutUser);
