TechStore - Plataforma de Compras Online
¡Bienvenido a TechStore! 🎉
Esta es una aplicación web moderna y dinámica para explorar, comparar y adquirir productos tecnológicos con facilidad. La plataforma permite a los usuarios agregar productos al carrito, gestionar su compra y disfrutar de una experiencia fluida y funcional.

📌 Funcionalidades
Carrito de Compras Dinámico

Agrega productos al carrito desde cualquier página.
Visualiza los artículos añadidos en el offcanvas del carrito.
Calcula el total de la compra en tiempo real.
Secciones Interactivas

Productos Recomendados: Explora los productos destacados.
Ofertas Exclusivas: Encuentra promociones especiales.
Categorías Destacadas: Navega entre categorías organizadas.
Gestión de Compras

Procede al pago con un formulario validado.
Carrito persistente usando localStorage, incluso si cambias de página.
UI/UX Moderno

Diseño responsivo con Bootstrap 5 y Tailwind CSS.
Navegación fluida gracias a un menú dinámico y un carrito siempre accesible.
📂 Estructura del Proyecto
bash
Copy code
TechStore/
├── assets/                # Archivos multimedia (imágenes, íconos)
├── css/                   # Estilos personalizados
│   └── estilos.css
├── js/                    # Lógica de la aplicación
│   ├── auth.js            # Manejo de autenticación
│   ├── cart.js            # Gestión del carrito
│   ├── loadComponents.js  # Carga de componentes dinámicos (navbar, footer, offcanvas)
│   └── products.js        # Gestión de productos y sus secciones
├── partials/              # Componentes reutilizables
│   ├── navbar.html        # Barra de navegación
│   ├── footer.html        # Pie de página
│   └── offcanvas-cart.html # Carrito flotante
├── index.html             # Página principal
├── cart.html              # Página del carrito
└── README.md              # Documentación del proyecto
🚀 Cómo Ejecutar el Proyecto
1. Clonar el Repositorio
bash
Copy code
git clone https://github.com/tu-usuario/techstore.git
cd techstore
2. Abrir en un Navegador
No se requieren dependencias externas. Simplemente abre index.html en cualquier navegador moderno.

📚 Tecnologías Utilizadas
HTML5: Estructura semántica.
CSS3: Estilización con Bootstrap 5 y Tailwind CSS.
JavaScript:
Gestión dinámica del DOM.
Persistencia de datos con localStorage.
Fetch API: Comunicación con APIs externas.
GitHub Pages: Publicación del sitio web (opcional).
🎨 Características Visuales
Diseño Responsivo
Optimizado para dispositivos móviles, tablets y escritorio.

Estilo Moderno
Interfaz limpia y minimalista con atención a la experiencia del usuario.

Componentes Dinámicos
Navbar, footer y carrito cargados dinámicamente desde archivos parciales (partials).

📦 Funcionalidades del Código
Gestión del Carrito
cart.js
Maneja las operaciones de agregar, eliminar y actualizar productos en el carrito.

Funciones Clave:

javascript
Copy code
addToCart(productId, productName, productPrice);
removeFromCart(productId);
renderCart();
🤝 Contribuciones
¡Se aceptan contribuciones! Si tienes ideas o mejoras para este proyecto, sigue los pasos:

Realiza un fork del repositorio.
Crea una rama nueva: git checkout -b feature/nueva-funcionalidad.
Realiza tus cambios y confirma los commits: git commit -m 'Descripción de cambios'.
Sube los cambios: git push origin feature/nueva-funcionalidad.
Crea un Pull Request.
📧 Contacto
Autor: Tu Nombre
Proyecto en GitHub: TechStore
¡Gracias por explorar TechStore! 🚀
Si te gusta el proyecto, ¡no olvides dejar una estrella ⭐ en el repositorio!
