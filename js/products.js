// URL de la API de MercadoLibre
const API_URL = "https://api.mercadolibre.com/sites/MLA/search?q=tecnologia";

// Elementos HTML
const productsGrid = document.getElementById("products-grid");
const offersGrid = document.getElementById("offers-grid");
const categoriesContainer = document.getElementById("categories-container");
const loadMoreProductsButton = document.getElementById("load-more-products");
const loadMoreOffersButton = document.getElementById("load-more-offers");

// Variables globales
let allProducts = [];
let productsDisplayed = 0;
let offersDisplayed = 0;
let filteredProducts = null; // Se inicializa en null para indicar que no hay filtro activo
// Función para obtener imagen de alta calidad
function getHighQualityImage(thumbnail) {
    return thumbnail.includes("I.jpg") ? thumbnail.replace("I.jpg", "O.jpg") : thumbnail;
}

// Función principal para cargar productos desde la API
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`Error al obtener productos: ${response.status}`);

        const data = await response.json();
        allProducts = data.results;

        // Inicializar visualización
        displayProducts(6); // Mostrar 6 productos iniciales
        displayOffers(6);   // Mostrar 6 ofertas iniciales

        // Generar filtros solo si los productos se cargaron
        if (allProducts.length > 0) {
            await generateCategoryFilters(allProducts);
        } else {
            console.warn("No se encontraron productos para generar filtros.");
        }
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        productsGrid.innerHTML = `<p class="text-center text-red-500">Error al cargar los productos. Intenta nuevamente más tarde.</p>`;
    }
}


// Función para mostrar productos generales
function displayProducts(limit) {
    const productsToShow = (filteredProducts || allProducts).slice(
        productsDisplayed,
        productsDisplayed + limit
    );

    productsToShow.forEach(product => {
        const highQualityImage = getHighQualityImage(product.thumbnail);
        const productCard = `
            <div class="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                <div class="overflow-hidden rounded-lg bg-gray-50">
                    <img src="${highQualityImage}" alt="${product.title}" class="h-48 w-full object-contain">
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-800 truncate">${product.title}</h3>
                    <p class="text-gray-600 mb-4">$${product.price}</p>
                    <div class="mt-4 flex justify-between gap-2">
                        <button class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition w-full"
                                onclick="addToCart('${product.id}', '${product.title}', ${product.price}, '${highQualityImage}')">
                            Agregar al Carrito
                        </button>
                        <a href="product.html?id=${product.id}" 
                           class="bg-gray-200 text-gray-800 text-center py-2 px-4 rounded hover:bg-gray-300 transition w-full">
                            Ver Detalles
                        </a>
                    </div>
                </div>
            </div>
        `;
        productsGrid.insertAdjacentHTML('beforeend', productCard);
    });

    productsDisplayed += limit;

    // Actualizar botón de "Ver más"
    const loadMoreContainer = document.getElementById("load-more-container");
    const currentProducts = filteredProducts || allProducts;
    if (productsDisplayed < currentProducts.length) {
        loadMoreContainer.innerHTML = `
            <button class="bg-gray-800 text-white py-2 px-6 rounded hover:bg-gray-700 transition mt-6"
                    onclick="displayProducts(6)">
                Ver más
            </button>
        `;
    } else {
        loadMoreContainer.innerHTML = ""; // Ocultar el botón si no hay más productos
    }
}


// Función para mostrar productos en oferta
function displayOffers(limit) {
    const offersToShow = allProducts.slice(offersDisplayed, offersDisplayed + limit);

    offersToShow.forEach(product => {
        const highQualityImage = getHighQualityImage(product.thumbnail);
        const originalPrice = (product.price * 1.2).toFixed(2); // Precio ficticio original
        const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);

        const offerCard = `
            <div class="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
                <div class="overflow-hidden rounded-lg bg-gray-50">
                    <img src="${highQualityImage}" alt="${product.title}" class="h-48 w-full object-contain">
                </div>
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-800 truncate">${product.title}</h3>
                    <div class="text-gray-500 mb-2">
                        <span class="line-through text-red-500">$${originalPrice}</span>
                        <span class="text-green-600 ml-2 font-bold">$${product.price}</span>
                        <span class="text-sm text-green-500">(${discount}% OFF)</span>
                    </div>
                    <div class="mt-4 flex justify-between gap-2">
                        <button class="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition w-full"
                                onclick="addToCart('${product.id}', '${product.title}', ${product.price})">
                            Agregar al Carrito
                        </button>
                        <a href="product.html?id=${product.id}" 
                           class="bg-gray-200 text-gray-800 text-center py-2 px-4 rounded hover:bg-gray-300 transition w-full">
                            Ver Detalles
                        </a>
                    </div>
                </div>
            </div>
        `;
        offersGrid.insertAdjacentHTML('beforeend', offerCard);
    });

    offersDisplayed += limit;

    // Actualizar botón de "Ver más"
    const loadMoreOffersContainer = document.getElementById("load-more-offers-container");
    if (offersDisplayed < allProducts.length) {
        loadMoreOffersContainer.innerHTML = `
            <button class="bg-gray-800 text-white py-2 px-6 rounded hover:bg-gray-700 transition mt-6"
                    onclick="displayOffers(6)">
                Ver más
            </button>
        `;
    } else {
        loadMoreOffersContainer.innerHTML = ""; // Ocultar el botón si no hay más productos
    }
}






// Mapear nombres de categorías para evitar múltiples solicitudes
const categoryNameCache = new Map();

// Función para obtener el nombre de la categoría desde la API
async function getCategoryName(categoryId) {
    if (categoryNameCache.has(categoryId)) {
        return categoryNameCache.get(categoryId);
    }

    try {
        const response = await fetch(`https://api.mercadolibre.com/categories/${categoryId}`);
        if (!response.ok) throw new Error(`Error al obtener la categoría ${categoryId}`);
        const data = await response.json();
        const categoryName = data.name || `Categoría ${categoryId}`;
        categoryNameCache.set(categoryId, categoryName);
        return categoryName;
    } catch (error) {
        console.error(`Error al obtener el nombre de la categoría ${categoryId}:`, error);
        return `Categoría ${categoryId}`;
    }
}

// Función para generar filtros por categorías
async function generateCategoryFilters(products) {
    const categoriesContainer = document.getElementById("categories-container");
    if (!categoriesContainer) {
        console.error("El contenedor de categorías no existe.");
        return;
    }

    const categories = new Map();

    // Recolectar categorías únicas
    products.forEach(product => {
        if (product.category_id && !categories.has(product.category_id)) {
            categories.set(product.category_id, null);
        }
    });

    categoriesContainer.innerHTML = ""; // Limpiar contenido previo

    // Botón para "Ver Todos"
const allButton = `
<button class="bg-gray-200 py-2 px-4 rounded shadow hover:bg-gray-300 transition"
        onclick="clearCategoryFilter()">
    Ver Todos
</button>
`;
    categoriesContainer.insertAdjacentHTML('beforeend', allButton);

    // Obtener nombres de categorías en paralelo
    const categoryPromises = Array.from(categories.keys()).map(async categoryId => {
        const categoryName = await getCategoryName(categoryId);
        categories.set(categoryId, categoryName);

        return `
            <button class="bg-gray-200 py-2 px-4 rounded shadow hover:bg-gray-300 transition"
                    onclick="filterProductsByCategory('${categoryId}')">
                ${categoryName}
            </button>
        `;
    });

    // Renderizar botones una vez completadas todas las promesas
    const buttons = await Promise.all(categoryPromises);
    categoriesContainer.innerHTML += buttons.join("");
}

// Función para limpiar el filtro de categoría
function clearCategoryFilter() {
    filteredProducts = null; // Restablece la variable global
    productsDisplayed = 0; // Reinicia el contador de productos mostrados
    productsGrid.innerHTML = ""; // Limpia la cuadrícula
    displayProducts(6); // Muestra productos generales
}



// Función para filtrar productos por categoría
function filterProductsByCategory(categoryId) {
    const productsGrid = document.getElementById("products-grid");
    if (!productsGrid) {
        console.error("El contenedor de productos no existe.");
        return;
    }

    // Actualiza los productos filtrados
    filteredProducts = allProducts.filter(
        product => String(product.category_id) === String(categoryId) // Comparación robusta
    );

    productsDisplayed = 0; // Reinicia el contador de productos mostrados
    productsGrid.innerHTML = ""; // Limpia la cuadrícula

    if (filteredProducts.length === 0) {
        console.warn(`No se encontraron productos para la categoría: ${categoryId}`);
        productsGrid.innerHTML = `<p class="text-center text-gray-500">No hay productos disponibles en esta categoría.</p>`;
        return;
    }

    // Mostrar los productos filtrados
    displayProducts(6);
}









// Inicializar
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Validar y cargar productos
        if (typeof fetchProducts === "function") {
            await fetchProducts(); // Asegúrate de que los productos se carguen
        } else {
            console.error("La función fetchProducts no está definida.");
        }

        // Configurar el botón de "Cargar más productos"
        const loadMoreProductsButton = document.getElementById("load-more-products-button");
        if (loadMoreProductsButton) {
            loadMoreProductsButton.addEventListener("click", () => {
                if (typeof displayProducts === "function") {
                    displayProducts(6); // Mostrar 6 productos adicionales
                } else {
                    console.error("La función displayProducts no está definida.");
                }
            });
        } else {
            console.warn("No se encontró el botón de 'Cargar más productos'.");
        }

        // Configurar el botón de "Cargar más ofertas"
        const loadMoreOffersButton = document.getElementById("load-more-offers-button");
        if (loadMoreOffersButton) {
            loadMoreOffersButton.addEventListener("click", () => {
                if (typeof displayOffers === "function") {
                    displayOffers(6); // Mostrar 6 ofertas adicionales
                } else {
                    console.error("La función displayOffers no está definida.");
                }
            });
        } else {
            console.warn("No se encontró el botón de 'Cargar más ofertas'.");
        }
    } catch (error) {
        console.error("Error durante la inicialización:", error);
    }
});



