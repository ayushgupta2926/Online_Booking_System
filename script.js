let cart = [];

// User Login
function loginUser() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("catalog").style.display = "block";
}

// Add item to cart
function addToCart(item) {
  cart.push(item);
  document.getElementById("cart-count").textContent = cart.length;
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

// Show cart page
function showCart() {
  cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  const ul = document.getElementById("cart-items");
  ul.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });

  document.getElementById("catalog").style.display = "none";
  document.getElementById("cart-view").style.display = "block";
}

// Back to catalog from cart
function closeCart() {
  document.getElementById("cart-view").style.display = "none";
  document.getElementById("catalog").style.display = "block";
}

// Logout and clear cart
function logoutUser() {
  localStorage.removeItem("cartItems");
  cart = [];
  document.getElementById("cart-count").textContent = 0;
  document.getElementById("catalog").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

// Proceed to delivery page
function proceedToDelivery() {
  document.getElementById("cart-view").style.display = "none";
  document.getElementById("delivery-view").style.display = "block";
}

// Back to cart from delivery
function backToCart() {
  document.getElementById("delivery-view").style.display = "none";
  document.getElementById("cart-view").style.display = "block";
}

// Cancel order from delivery
function cancelorder() {
  const confirmCancel = confirm("Are you sure you want to cancel the order?");
  if (confirmCancel) {
    document.getElementById("delivery-view").style.display = "none";
    document.getElementById("catalog").style.display = "block";
  }
}

// Confirm order and show summary modal
function confirmOrder() {
  const address = document.getElementById("address").value.trim();
  const zipcode = document.getElementById("zipcode")?.value.trim(); // Use corrected ID
  const payment = document.getElementById("payment-method").value;

  if (!address) {
    alert("Please enter delivery address.");
    return;
  }

  if (!zipcode) {
    alert("Please enter your zip code.");
    return;
  }

  if (!payment) {
    alert("Please select a payment method.");
    return;
  }

  const summary = `
    📍 <strong>Address:</strong><br>${address} - ${zipcode}<br><br>
    💳 <strong>Payment:</strong> ${payment}
  `;
  document.getElementById("order-summary").innerHTML = summary;
  document.getElementById("order-modal").style.display = "flex";

  // Reset cart
  localStorage.removeItem("cartItems");
  cart = [];
  document.getElementById("cart-count").textContent = 0;

  document.getElementById("delivery-view").style.display = "none";
}

// Close order confirmation modal
function closeModal() {
  document.getElementById("order-modal").style.display = "none";
  document.getElementById("catalog").style.display = "block";
}

// Rate Us (dummy action)
function rateUs() {
  alert("Thank you for shopping with us! 🌟 Please rate us 5 stars!");
}
