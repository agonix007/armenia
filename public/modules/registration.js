import config from "../config/config.js";

toastr.options = {
  positionClass: "toast-bottom-right",
  closeButton: true,
  progressBar: true,
  timeOut: 3000,
};

const validatePassword = (passwordInput) => {
  // Regex pattern to check for at least one character and one number
  const pattern = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
  if (!pattern.test(passwordInput)) {
    toastr.info("Password must contain at least one character and one number");
    throw new Error(
      "Password must contain at least one character and one number"
    );
  }
};

const validateEmail = (emailInput) => {
  // Regex pattern to check for email validation
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(emailInput)) {
    toastr.info("Please enter a valid email address");
    throw new Error("Please enter a valid email address");
  }
};

const registerUser = async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const cpassword = document.getElementById("cpassword").value;

  const loader = document.getElementById("loader");

  validateEmail(email);
  validatePassword(password);

  if (password !== cpassword) {
    toastr.warning("Passwords are not matching.");
    throw new Error("Passwords are not matching.");
  }

  const userData = {
    name: name,
    email: email,
    password: password,
    cpassword: cpassword,
  };

  try {
    loader.style.display = "block";

    const response = await fetch(config.url + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      toastr.success("Registration Successful", "Congratulations🎉");
      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      throw new Error("Email already taken");
    }
  } catch (error) {
    console.error(error.message);
    toastr.error(error.message);
  } finally {
    loader.style.display = "none";
  }
};

const registrationForm = document.getElementById("registrationForm");
registrationForm.addEventListener("submit", registerUser);
