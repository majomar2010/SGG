// ==========================================================================
// 1. USUARIOS DE PRUEBA OBLIGATORIOS
// ==========================================================================
const USERS_DATABASE = [
    { username: "analistaQA", password: "password123", name: "Analista de Calidad" },
    { username: "sebastian", password: "sggProyecto1", name: "José Sebastián" }
];

// ==========================================================================
// 2. LOGICA DE INICIO DE SESIÓN (Validaciones normales)
// ==========================================================================
const loginForm = document.getElementById('login-form');
const messageBox = document.getElementById('form-message');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Limpiar alertas anteriores
    messageBox.className = "message-box";
    messageBox.textContent = "";
    
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    
    if (!usernameInput || !passwordInput) {
        showFeedback("error", "Por favor, completa todos los campos.");
        return;
    }

    // Buscar usuario en la lista
    const userFound = USERS_DATABASE.find(user => user.username === usernameInput);

    if (!userFound) {
        showFeedback("error", "El usuario ingresado no está registrado.");
        return;
    }

    if (userFound.password !== passwordInput) {
        showFeedback("error", "La contraseña es incorrecta.");
        return;
    }

    // Éxito
    showFeedback("success", `¡Bienvenido/a, ${userFound.name}! Entrando...`);
});

function showFeedback(type, text) {
    messageBox.textContent = text;
    messageBox.className = `message-box ${type}`;
}

// ==========================================================================
// 3. INTERACCIÓN DE LOS ENLACES INFERIORES (Simulación)
// ==========================================================================
document.getElementById('link-forgot').addEventListener('click', (e) => {
    e.preventDefault();
    showFeedback("success", "Se envió un enlace de recuperación a tu correo (Simulado).");
});

document.getElementById('link-register').addEventListener('click', (e) => {
    e.preventDefault();
    showFeedback("success", "Redireccionando al formulario de registro (Simulado).");
});

// ==========================================================================
// 4. CONTROL DEL MODO OSCURO (Persistente)
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.innerHTML = "☀️ Modo Claro";
    themeToggleBtn.setAttribute('aria-pressed', 'true');
}

themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerHTML = "🌙 Modo Oscuro";
        themeToggleBtn.setAttribute('aria-pressed', 'false');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerHTML = "☀️ Modo Claro";
        themeToggleBtn.setAttribute('aria-pressed', 'true');
    }
});
