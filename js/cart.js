// Obtener el carrito desde localStorage
function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!Array.isArray(cart)) throw new Error("Datos inválidos en el carrito");
    return cart;
  } catch (error) {
    console.error("Error al obtener el carrito desde localStorage:", error);
    return [];
  }
}

// Guardar el carrito en localStorage
function saveCart(cart) {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error al guardar el carrito en localStorage:", error);
  }
}

function updateNavbarCart() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
    }
  } catch (error) {
    console.error("Error actualizando el contador del carrito:", error);
  }
}

// Renderizar los productos del carrito
function renderCart() {
  const cart = getCart();
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="text-center text-gray-500">Tu carrito está vacío.</p>`;
    cartTotal.textContent = "0.00";
    return;
  }

  cart.forEach((item) => {
    total += item.price * item.quantity;
    const productElement = document.createElement("div");
    productElement.className =
      "d-flex align-items-center bg-white shadow-sm rounded-lg p-3 mb-3";

    const imageSrc = item.image || "assets/images/default-placeholder.png";
    productElement.innerHTML = `
            <div class="d-flex align-items-center flex-grow-1">
                <img src="${imageSrc}" alt="${
      item.title
    }" class="rounded me-3" style="width: 60px; height: 60px; object-fit: cover;">
                <div>
                    <h5 class="mb-1 text-gray-800 fw-bold">${item.title}</h5>
                    <p class="mb-0 text-sm text-gray-600">Precio: $${item.price.toFixed(
                      2
                    )}</p>
                    <p class="mb-0 text-sm text-gray-600">
                        Cantidad: 
                        <input type="number" min="1" value="${
                          item.quantity
                        }" class="form-control form-control-sm d-inline w-25 ms-2">
                    </p>
                </div>
            </div>
            <div class="text-end">
                <p class="fw-bold text-gray-900">$${(
                  item.price * item.quantity
                ).toFixed(2)}</p>
                <button class="btn btn-dark btn-sm">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;

    const quantityInput = productElement.querySelector("input[type='number']");
    quantityInput.addEventListener("change", () => {
      const newQuantity = parseInt(quantityInput.value, 10);
      if (isNaN(newQuantity) || newQuantity < 1) {
        quantityInput.value = item.quantity;
        return;
      }
      updateQuantity(item.id, newQuantity);
    });

    const removeButton = productElement.querySelector("button");
    removeButton.addEventListener("click", () => removeFromCart(item.id));

    cartItemsContainer.appendChild(productElement);
  });

  cartTotal.textContent = total.toFixed(2);
}

// Actualizar cantidad en el carrito
function updateQuantity(productId, quantity) {
  const cart = getCart();
  const product = cart.find((item) => item.id === productId);

  if (product) {
    product.quantity = quantity;
    saveCart(cart);
    renderCart();
  }
}

// Eliminar producto del carrito
function removeFromCart(productId) {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.id !== productId);
  saveCart(updatedCart);
  renderCart();
  updateNavbarCart();
}

function redirectToCheckout() {
  window.location.href = "cart.html";
}

// Agregar productos al carrito
function addToCart(productId, title, price, imageUrl) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const validImageUrl =
    imageUrl && imageUrl.trim() !== ""
      ? imageUrl
      : "assets/images/default-placeholder.png";

  console.log("Imagen pasada al carrito:", validImageUrl);

  const existingProduct = cart.find((item) => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: productId,
      title,
      price,
      quantity: 1,
      image: validImageUrl,
    });
  }

  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error al guardar el carrito en localStorage:", error);
  }

  renderCart();
  updateNavbarCart();
  const cartOffcanvas = new bootstrap.Offcanvas(
    document.getElementById("cartOffcanvas")
  );
  cartOffcanvas.show();
}

// Limpiar el carrito
function clearCart() {
  try {
    localStorage.setItem("cart", JSON.stringify([]));
  } catch (error) {
    console.error("Error al limpiar el carrito:", error);
  }
}
// Inicializar carrito
document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const checkoutButton = document.getElementById("checkout-button");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", () => {
      window.location.href = "cart.html"; // Redirige al carrito
    });
  }

  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = getCart().reduce(
      (count, item) => count + item.quantity,
      0
    );
  }
});
