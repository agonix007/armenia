toastr.options = {
  positionClass: "toast-bottom-right",
  closeButton: true,
  progressBar: true,
  timeOut: 3000,
};

const loginUser = async (event) => {
  event.preventDefault();

  if (localStorage.getItem("username")) {
    toastr.info("You have already Logged in");
    toastr.success("Redirecting to home page");
    setTimeout(() => {
      window.location.href = "/";
    }, 1800);
    return;
  }

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const loader = document.getElementById("loader");

  const userData = {
    email: email,
    password: password,
  };

  try {
    loader.style.display = "block";

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      // const token = data.tokens[data.tokens.length - 1].token;

      // Setting the userName, token in local storage
      localStorage.setItem("username", data.name);
      // localStorage.setItem("token", token);

      // Showing toastr fo success login
      toastr.success("Login Successful");

      // Redirect to home page after a short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } else {
      throw new Error("Invalid login details");
    }
  } catch (error) {
    console.error(error.message);
    toastr.error(error.message);
  } finally {
    loader.style.display = "none";
  }
};

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", loginUser);
