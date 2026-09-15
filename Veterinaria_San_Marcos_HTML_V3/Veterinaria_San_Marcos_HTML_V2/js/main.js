document.addEventListener('DOMContentLoaded', () => {
    // Credenciales del Administrador
    const ADMIN_EMAIL = 'admin@sanmarcos.cl';
    const ADMIN_PASS = 'admin123';

    // Obtener estado de la sesión desde localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userRole = localStorage.getItem('userRole'); // 'admin' o 'cliente'

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // 1. Proteger páginas exclusivas de administración
    const adminPages = ['admin.html', 'fichas.html'];
    if (adminPages.includes(currentPage)) {
        if (!isLoggedIn || userRole !== 'admin') {
            alert('Acceso denegado: Esta sección es exclusiva para el administrador.');
            window.location.href = 'login.html';
            return;
        }
    }

    // 2. Control de visibilidad del menú
    const guestElements = document.querySelectorAll('.guest-only');
    const authElements = document.querySelectorAll('.auth-only');
    const adminElements = document.querySelectorAll('.admin-only');

    if (isLoggedIn) {
        guestElements.forEach(el => el.style.display = 'none');
        authElements.forEach(el => el.style.display = 'inline-block');

        // Solo mostrar enlaces admin si el rol es 'admin'
        adminElements.forEach(el => {
            el.style.display = (userRole === 'admin') ? 'inline-block' : 'none';
        });
    } else {
        guestElements.forEach(el => el.style.display = 'inline-block');
        authElements.forEach(el => el.style.display = 'none');
        adminElements.forEach(el => el.style.display = 'none');
    }

    // 3. Formulario de Inicio de Sesión
    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value.trim();
            const pass = document.getElementById('loginPass').value.trim();

            if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
                // Iniciar sesión como Administrador
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', 'admin');
                localStorage.setItem('userEmail', email);
                
                alert('¡Bienvenido Administrador!');
                window.location.href = 'admin.html';
            } else {
                // Iniciar sesión como Usuario / Cliente normal
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', 'cliente');
                localStorage.setItem('userEmail', email);

                alert('¡Sesión iniciada correctamente!');
                window.location.href = 'index.html';
            }
        });
    }

    // 4. Cerrar Sesión
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear(); // Limpia la sesión
            alert('Has cerrado sesión correctamente.');
            window.location.href = 'index.html';
        });
    }

    const lat = -34.1701;
    const lng = -70.7406;

    // 1. Inicializar el mapa en el contenedor 'map'
    const map = L.map('map').setView([lat, lng], 16);

    // 2. Cargar el mapa desde OpenStreetMap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // 3. Agregar un marcador en la ubicación de la veterinaria
    const marker = L.marker([lat, lng]).addTo(map);

    // 4. Agregar un mensaje informativo sobre el marcador
    marker.bindPopup('<b>Veterinaria San Marcos</b><br>Av. Libertador Bernardo O\'Higgins 456, Rancagua.').openPopup();

});
