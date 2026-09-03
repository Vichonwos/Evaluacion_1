document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicialización del Mapa interactivo de Leaflet (Rancagua) si existe el contenedor
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        // Coordenadas de Rancagua, Chile
        const lat = -34.17083;
        const lng = -70.74444;
        
        const map = L.map('map').setView([lat, lng], 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map)
            .bindPopup('<b>Veterinaria San Marcos</b><br>Av. Libertador Bernardo OHiggins 456, Rancagua.')
            .openPopup()
}

    // 2. Validación de Formularios con JavaScript (Citas y Login)
    const formCita = document.getElementById('formCita');
    const feedbackBox = document.getElementById('mensaje-feedback');

    if (formCita) {
        formCita.addEventListener('submit', (e) => {
            e.preventDefault();
            feedbackBox.innerHTML = '';

            const nombreDueno = document.getElementById('nombreDueno').value.trim();
            const emailDueno = document.getElementById('emailDueno').value.trim();
            const mascota = document.getElementById('nombreMascota').value.trim();
            const especie = document.getElementById('especie').value;
            const fechaCita = document.getElementById('fechaCita').value;
            const motivo = document.getElementById('motivo').value.trim();

            let errores = [];

            if (nombreDueno === '') errores.push('El nombre del dueño es obligatorio.');
            if (email === '' || !email.includes('@')) errores.push('Debe ingresar un correo electrónico válido.');
            if (mascota === '') errores.push('El nombre de la mascota es obligatorio.');
            if (especie === '') errores.push('Debe seleccionar la especie.');
            if (fechaCita === '') errores.push('Debe seleccionar fecha y hora para la cita.');
            if (motivo === '') errores.push('El motivo de la consulta es obligatorio.');

            if (errores.length > 0) {
                feedbackBox.style.color = '#e53e3e';
                feedbackBox.innerHTML = '<ul>' + errores.map(err => `<li>${err}</li>`).join('') + '</ul>';
            } else {
                feedbackBox.style.color = '#38a169';
                feedbackBox.innerHTML = '¡Solicitud de cita enviada con éxito! La recepcionista la confirmará a la brevedad.';
                formCita.reset();
                setTimeout(() => {
                    feedbackBox.innerHTML = '';
                }, 6000);
            }
        });
    }

    const formLogin = document.getElementById('formLogin');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            alert(`Inicio de sesión simulado para: ${email}\nToken de acceso generado correctamente.`);
            window.location.href = 'index.html';
        });
    }
});

function alertModal() {
    alert('Formulario de registro de nuevo usuario administrador/empleado activado.');
}
