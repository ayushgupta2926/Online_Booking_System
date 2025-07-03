let cart = [];

function loginUser() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("catalog").style.display = "block";
}

function addToCart(item) {
  cart.push(item);
  document.getElementById("cart-count").textContent = cart.length;
  localStorage.setItem("cartItems", JSON.stringify(cart));
}

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

function closeCart() {
  document.getElementById("cart-view").style.display = "none";
  document.getElementById("catalog").style.display = "block";
}

function logoutUser() {
  localStorage.removeItem("cartItems");
  cart = [];
  document.getElementById("cart-count").textContent = 0;
  document.getElementById("catalog").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

function proceedToDelivery() {
  document.getElementById("cart-view").style.display = "none";
  document.getElementById("delivery-view").style.display = "block";
}

function backToCart() {
  document.getElementById("delivery-view").style.display = "none";
  document.getElementById("cart-view").style.display = "block";
}

function confirmOrder() {
  const address = document.getElementById("address").value.trim();
  const payment = document.getElementById("payment-method").value;

  if (!address) {
    alert("Please enter delivery address.");
    return;
  }

  if (!payment) {
    alert("Please select a payment method.");
    return;
  }

  alert("✅ Order confirmed!\n\n📍 Address:\n" + address + "\n💳 Payment: " + payment);
  
  localStorage.removeItem("cartItems");
  document.getElementById("cart-count").textContent = 0;
  cart = [];

  // Reset views
  document.getElementById("delivery-view").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}
