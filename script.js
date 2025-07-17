let cart = [];
let orders = JSON.parse(localStorage.getItem("orders") || "[]");

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

// Confirm order and show modal
function confirmOrder() {
  const address = document.getElementById("address").value.trim();
  const zipcode = document.getElementById("zipcode").value.trim();
  const payment = document.getElementById("payment-method").value;
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

  if (!address || !zipcode || !payment) {
    alert("Please complete all delivery details!");
    return;
  }

  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const summary = `
    <strong>Items:</strong> ${cartItems.join(", ")}<br>
    <strong>Address:</strong> ${address}<br>
    <strong>Zip:</strong> ${zipcode}<br>
    <strong>Payment:</strong> ${payment}
  `;

  document.getElementById("order-summary").innerHTML = summary;
  document.getElementById("order-modal").style.display = "block";

  // Save order
  orders.push({ items: cartItems, address, zipcode, payment });
  localStorage.setItem("orders", JSON.stringify(orders));

  // Clear cart and form
  localStorage.removeItem("cartItems");
  cart = [];
  document.getElementById("cart-count").textContent = "0";
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

// View My Orders
function seeMyOrders() {
  document.getElementById("catalog").style.display = "none";
  document.getElementById("orders-view").style.display = "block";

  const ordersList = document.getElementById("orders-list");
  ordersList.innerHTML = "";

  const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");

  if (savedOrders.length === 0) {
    ordersList.innerHTML = "<li>No orders placed yet.</li>";
  } else {
    savedOrders.forEach((order, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>Order ${index + 1}:</strong><br>
        Items: ${order.items.join(", ")}<br>
        Address: ${order.address}<br>
        Zipcode: ${order.zipcode}<br>
        Payment: ${order.payment}
      `;
      ordersList.appendChild(li);
    });
  }
}

// Back to catalog from orders view
function backToCatalog() {
  document.getElementById("orders-view").style.display = "none";
  document.getElementById("catalog").style.display = "block";
}
