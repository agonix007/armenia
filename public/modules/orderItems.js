toastr.options = {
  positionClass: "toast-bottom-right",
  closeButton: true,
  progressBar: true,
  timeOut: 3000,
};

const urlParams = new URLSearchParams(window.location.search);
const orderCartId = urlParams.get("id");
const productIndex = urlParams.get("ind");

const addingData = (data) => {
  const cardData = document.getElementById("cardDetails");
  const orderDate = new Date(data.orderedAt);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const indianDate = new Intl.DateTimeFormat("en-IN", options).format(
    orderDate
  );
  const indianTime = new Date(data.orderedAt).toLocaleTimeString("en-IN");
  const detail = data.orderedItems.cartItems.reverse()[productIndex];
  document.title = detail.product.pname;
  cardData.innerHTML = `
        <div class="card-header p-4">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="text-muted mb-2">
                      Order ID:
                      <span class="fw-bold text-body">#${
                        data.orderId
                      }</span></p>
                    <p class="text-muted mb-0">
                      Place On
                      <span class="fw-bold text-body">${indianDate}</span>
                    </p>
                  </div>
                  <!-- SELF_CLASS -->
                  <div class="viewclass">
                    <button type="button" class="btn btn-grad fw-bold" onclick="showProductDetails('${
                      detail.product._id
                    }')">View Details</button>
                  </div>
                </div>
              </div>
              <div class="card-body p-4">
                <div class="d-flex flex-row mb-4 pb-2">
                  <div class="flex-fill">
                    <h5 class="bold">${detail.product.pname}</h5>
                    <p class="text-muted"> Qt: ${detail.quantity} item</p>
                    <h4 class="mb-3">
                      &#8377;${detail.product.price * detail.quantity}
                      <span class="small text-muted"> via (${
                        data.orderedItems.paymentOptions
                      }) </span></h4>
                    <p class="text-muted">Tracking Status on:
                      <span class="text-body">${indianTime}</span></p>
                  </div>
                  <div class="imageUrl">
                    <img
                      class="align-self-center img-fluid"
                      src="${detail.product.imageUrl}"
                    />
                  </div>
                </div>
                <ul id="progressbar-1" class="mx-0 mt-0 mb-5 px-0 pt-0 pb-4">
                  <li class="step0 active" id="step1"><span
                      style="margin-left: 22px; margin-top: 12px;"
                    >PLACED</span></li>
                  <li class="step0 active text-center" id="step2"><span
                    >SHIPPED</span></li>
                  <li class="step0 text-muted text-end" id="step3"><span
                      style="margin-right: 22px;"
                    >DELIVERED</span></li>
                </ul>
              </div>
              <div class="card-footer p-4">
                <div class="d-flex justify-content-between">
                  <!-- SELF_ID -->
                  <h5 class="fw-normal mb-0" id="Switch"><a
                      href="/orders"
                    >Back</a></h5>
                </div>
              </div>
    `;
};

const getOrderDeatils = async () => {
  try {
    const response = await fetch(`/api/orders/${orderCartId}`);
    if (response.ok !== true) {
      throw new Error("Failed to load from backend.");
    }
    const data = await response.json();
    addingData(data);
  } catch (error) {
    console.log(error.message);
  }
};

getOrderDeatils();

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
