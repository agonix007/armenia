async function updateCartIndicator() {
  try {
    const response = await fetch("/api/cart");
    if (!response.ok) {
      throw new Error("Failed to fetch cart data");
    }
    const cartData = await response.json();
    const cartCount = cartData.cartItems.length;
    const cartIndicator = document.getElementById("cartIndicator");
    cartIndicator.textContent = cartCount > 10 ? "10+" : cartCount.toString();
  } catch (error) {
    console.log(error.message);
  }
}

updateCartIndicator();

document.addEventListener("DOMContentLoaded", () => {
  updateCartIndicator();
});