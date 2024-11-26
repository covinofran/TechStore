// Simular inicio de sesión con localStorage
function loginUser(username) {
  localStorage.setItem('username', username);
  updateNavbarUser();
}

// Cerrar sesión
function logoutUser() {
  localStorage.removeItem('username');
  updateNavbarUser();
  alert('Has cerrado sesión exitosamente.');
}

// Actualizar el estado del usuario en la barra de navegación
function updateNavbarUser() {
  const username = localStorage.getItem('username');
  const userNavItem = document.getElementById('user-nav-item');

  if (username) {
      userNavItem.innerHTML = `
          <span class="text-white">Hola, ${username}</span>
          <button onclick="logoutUser()" class="ml-2 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-500" aria-label="Cerrar sesión">
              Cerrar sesión
          </button>
      `;
  } else {
      userNavItem.innerHTML = `
          <button class="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-500" data-bs-toggle="modal" data-bs-target="#loginModal" aria-label="Iniciar sesión">
              Iniciar sesión
          </button>
      `;
  }
}

// Manejo del formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevenir el envío del formulario

  const usernameInput = document.getElementById('usernameInput');
  const username = usernameInput.value.trim();

  if (username.length >= 3) {
      loginUser(username);
      const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
      loginModal.hide(); // Cerrar el modal
      alert(`Bienvenido, ${username}!`);
  } else {
      alert('Por favor, ingresa un nombre de usuario válido (mínimo 3 caracteres).');
  }
});

// Inicializar estado del usuario
document.addEventListener('DOMContentLoaded', updateNavbarUser);
