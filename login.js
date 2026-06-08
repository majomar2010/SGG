document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Usuarios predeterminados de prueba (Principio ETC - Fácil de modificar)
    const MOCK_USERS = [
        { username: 'admin@sgg.com', password: 'password123' },
        { username: 'user@sgg.com', password: 'user2026' }
    ];

    // 2. Elementos del DOM
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageContainer = document.getElementById('message-container');
    const themeToggle = document.getElementById('theme-toggle');

    // 3. Inicialización y Persistencia del Tema (LocalStorage)
    const savedTheme = localStorage.getItem('sgg-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    renderThemeToggleText(savedTheme);

    // Evento para cambiar de tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const targetTheme = (currentTheme === 'dark') ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('sgg-theme', targetTheme);
        renderThemeToggleText(targetTheme);
    });

    function renderThemeToggleText(theme) {
        themeToggle.textContent = (theme === 'dark') ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
    }

    // 4. Función Centralizada de Notificaciones (Principio DRY)
    function showFeedback(message, status) {
        messageContainer.innerHTML = ''; // Limpiar estados previos
        
        if (!message) return;

        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${status}`;
        alertElement.textContent = message;
        
        messageContainer.appendChild(alertElement);
    }

    // 5. Manejo del Formulario e Intercepción del Submit
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const usernameValue = usernameInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        // Validación estructural: Campos Vacíos
        if (usernameValue === '' || passwordValue === '') {
            showFeedback('Por favor, complete todos los campos obligatorios.', 'error');
            return;
        }

        // Buscar coincidencias dentro de los datos simulados
        const matchedUser = MOCK_USERS.find(user => user.username === usernameValue);

        if (!matchedUser) {
            showFeedback('El usuario ingresado no se encuentra registrado.', 'error');
        } else if (matchedUser.password !== passwordValue) {
            showFeedback('Error: La contraseña ingresada es incorrecta.', 'error');
        } else {
            showFeedback('¡Inicio de sesión exitoso! Redireccionando...', 'success');
            loginForm.reset();
            
            // Simulación de navegación exitosa post-login
            /* setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500); */
        }
    });
});