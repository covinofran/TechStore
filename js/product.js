// Obtener el ID del producto desde la URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Verificar que el ID exista
if (!productId) {
  document.getElementById("product-details").innerHTML = `
    <div class="alert alert-danger text-center">
      <p class="fs-5 mb-0">No se especificó un producto válido.</p>
    </div>
  `;
} else {
  // URL base de la API para obtener detalles del producto
  const API_URL = `https://api.mercadolibre.com/items/${productId}`;

  // Elemento donde se cargaran los detalles del producto
  const productDetails = document.getElementById("product-details");

  // Cargar los detalles del producto
  async function fetchProductDetails() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok)
        throw new Error(`Error al obtener el producto: ${response.status}`);
      const product = await response.json();

      // Crear contenido dinamico
      const productHTML = `
  <div class="row">
    <!-- Imagen del producto -->
    <div class="col-md-6 text-center mb-4">
      <div 
        class="p-3 rounded shadow bg-white d-flex justify-content-center align-items-center" 
        style="height: 100%; min-height: 400px;"
      >
        <img
          src="${product.pictures?.[0]?.url || product.thumbnail}"
          alt="${product.title}"
          class="img-fluid rounded"
          style="max-height: 100%; max-width: 100%; object-fit: contain;"
        />
      </div>
    </div>
    <!-- Información del producto -->
    <div class="col-md-6">
      <h1 class="text-gray-900 fw-bold mb-3" style="font-size: 2.5rem;">
        ${product.title}
      </h1>
      <p class="text-gray-600 mb-3" style="font-size: 1rem;">
        ${product.description || "Descripción no disponible."}
      </p>
      <p class="h4 text-gray-800 fw-bold mb-4">
        Precio: <span class="h3 text-gray-900 fw-bold">$${product.price.toFixed(
          2
        )}</span>
      </p>
      <button
        class="btn btn-dark btn-lg w-100 fw-bold rounded-lg"
        onclick="addToCart('${product.id}', '${product.title}', ${
        product.price
      }, '${product.thumbnail}')"
      >
        <i class="bi bi-cart-plus"></i> Agregar al Carrito
      </button>
    </div>
  </div>
`;

      productDetails.innerHTML = productHTML;
    } catch (error) {
      console.error("Error al cargar el producto:", error);
      productDetails.innerHTML = `
        <div class="alert alert-danger text-center">
          <p class="fs-5 mb-0">No se pudo cargar el producto. Intenta nuevamente más tarde.</p>
        </div>
      `;
    }
  }

  // Cargar los detalles al cargar la pagina
  document.addEventListener("DOMContentLoaded", fetchProductDetails);
}
