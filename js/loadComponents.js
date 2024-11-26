async function loadComponents() {
  try {
    // Cargar Navbar
    const navbarResponse = await fetch("partials/navbar.html");
    const navbarHTML = await navbarResponse.text();
    document.getElementById("navbar-container").innerHTML = navbarHTML;
    updateNavbarCart();

    // Cargar Footer
    const footerResponse = await fetch("partials/footer.html");
    const footerHTML = await footerResponse.text();
    document.getElementById("footer-container").innerHTML = footerHTML;

    // Cargar Offcanvas del Carrito
    const offcanvasResponse = await fetch("partials/offcanvas-cart.html");
    const offcanvasHTML = await offcanvasResponse.text();
    document.body.insertAdjacentHTML("beforeend", offcanvasHTML);

    // Renderizar carrito después de cargar el HTML del offcanvas
    renderCart();
  } catch (err) {
    console.error("Error al cargar los componentes:", err);
  }
}


// Inicializar cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", loadComponents);
