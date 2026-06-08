document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. USUARIOS DE PRUEBA (Requisito Obligatorio)
    // ==========================================================================
    const MOCK_USERS = [
        { username: "sebastian.astesana", password: "Password123" },
        { username: "alumno.tecnica29", password: "Sgg2026_Project" }
    ];

    // ==========================================================================
    // 2. REFERENCIAS AL DOM
    // ==========================================================================
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageBox = document.getElementById('message-box');
    const themeToggleBtn = document.getElementById('theme-toggle');

    // ==========================================================================
    // 3. GESTIÓN DE TEMA (Modo Claro/Oscuro con Persistencia en LocalStorage)
    // ==========================================================================
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = (theme === 'dark') ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeToggleBtn.textContent = (theme === 'dark') ? '☀️' : '🌙';
    }

    // ==========================================================================
    // 4. LÓGICA DE VALIDACIÓN Y CONTROL DE ACCESO
    // ==========================================================================
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitamos la recarga de página por defecto

        const usernameVal = usernameInput.value.trim();
        const passwordVal = passwordInput.value.trim();

        // Limpieza de estados anteriores del message-box
        showMessage("", "hidden");

        // Validación 1: Campos vacíos
        if (!usernameVal || !passwordVal) {
            showMessage("Por favor, complete todos los campos obligatorios.", "error");
            return;
        }

        // Validación 2: Buscar si el usuario existe
        const userFound = MOCK_USERS.find(user => user.username === usernameVal);

        if (!userFound) {
            showMessage("Error: El usuario ingresado no se encuentra registrado.", "error");
            return;
        }

        // Validación 3: Validar contraseña correspondiente
        if (userFound.password !== passwordVal) {
            showMessage("Error: La contraseña ingresada es incorrecta.", "error");
            return;
        }

        // Caso de Éxito: Credenciales Correctas
        showMessage("¡Ingreso exitoso! Redireccionando al panel principal...", "success");
        
        // Simulación de guardado de sesión
        localStorage.setItem('sessionUser', userFound.username);
        
        // Deshabilitar formulario post-éxito
        loginForm.querySelectorAll('input, button').forEach(el => el.disabled = true);
    });

    // Función auxiliar bajo el principio DRY para no repetir lógica de renderizado
    function showMessage(text, type) {
        messageBox.className = "message-box"; // Resetea clases
        if (type === "hidden") {
            messageBox.classList.add('hidden');
            messageBox.textContent = "";
        } else {
            messageBox.classList.add(type);
            messageBox.textContent = text;
        }
    }
});