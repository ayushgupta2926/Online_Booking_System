const dummyUser = { email: "user@example.com", password: "password123" };

function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (email === dummyUser.email && password === dummyUser.password) {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("catalog").style.display = "block";
    updateCartCount();
  } else {
    alert("Invalid credentials.\nTry:\nEmail: user@example.com\nPassword: password123");
  }
}

function logoutUser() {
  localStorage.removeItem("cart");
  document.getElementById("catalog").style.display = "none";
  document.getElementById("cart-view").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

function addToCart(productName) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(productName);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

function showCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const ul = document.getElementById("cart-items");
  ul.innerHTML = "";
  if (cartItems.length === 0) {
    ul.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    cartItems.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  }
  document.getElementById("catalog").style.display = "none";
  document.getElementById("cart-view").style.display = "block";
}

function closeCart() {
  document.getElementById("cart-view").style.display = "none";
  document.getElementById("catalog").style.display = "block";
}

function buyItems() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartItems.length === 0) {
    alert("Your cart is empty."); return;
  }
  alert("Thank you for your purchase!\nItems bought:\n" + cartItems.join(", "));
  localStorage.removeItem("cart");
  updateCartCount();
  closeCart();
}
