// ==========================================================================
// 1. BASE DE DATOS LOCAL (Carga cuentas guardadas o inicia con las obligatorias)
// ==========================================================================
const DEFAULT_USERS = [
    { username: "analistaQA", password: "password123", name: "Analista de Calidad" },
    { username: "sebastian", password: "sggProyecto1", name: "José Sebastián" }
];

// Inicializar base de datos persistente en el navegador
if (!localStorage.getItem('users_db')) {
    localStorage.setItem('users_db', JSON.stringify(DEFAULT_USERS));
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users_db'));
}

// ==========================================================================
// 2. ELEMENTOS COMUNES Y MENSAJES
// ==========================================================================
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const messageBox = document.getElementById('form-message');

function showFeedback(type, text) {
    if (messageBox) {
        messageBox.textContent = text;
        messageBox.className = `message-box ${type}`;
    }
}

// ==========================================================================
// 3. PROCESAR INICIO DE SESIÓN (index.html)
// ==========================================================================
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userIn = document.getElementById('username').value.trim();
        const passIn = document.getElementById('password').value.trim();
        
        if (!userIn || !passIn) {
            showFeedback("error", "Por favor, completa todos los campos.");
            return;
        }

        const currentUsers = getUsers();
        const account = currentUsers.find(u => u.username.toLowerCase() === userIn.toLowerCase());

        if (!account) {
            showFeedback("error", "El usuario ingresado no está registrado.");
            return;
        }

        if (account.password !== passIn) {
            showFeedback("error", "La contraseña es incorrecta.");
            return;
        }

        showFeedback("success", `¡Bienvenido/a, ${account.name}! Redireccionando...`);
    });

    document.getElementById('link-forgot').addEventListener('click', (e) => {
        e.preventDefault();
        showFeedback("success", "Se envió un código para restablecer tu contraseña.");
    });
}

// ==========================================================================
// 4. PROCESAR NUEVO REGISTRO REAL (registro.html)
// ==========================================================================
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const regName = document.getElementById('reg-name').value.trim();
        const regUser = document.getElementById('reg-username').value.trim();
        const regPass = document.getElementById('reg-password').value.trim();
        
        if (!regName || !regUser || !regPass) {
            showFeedback("error", "Todos los campos son obligatorios.");
            return;
        }
        
        if (regPass.length < 6) {
            showFeedback("error", "La contraseña debe tener al menos 6 caracteres.");
            return;
        }
        
        const currentUsers = getUsers();
        const userExists = currentUsers.some(u => u.username.toLowerCase() === regUser.toLowerCase());
        
        if (userExists) {
            showFeedback("error", "Este nombre de usuario ya está registrado.");
            return;
        }
        
        // Guardar la nueva cuenta de forma real
        currentUsers.push({ username: regUser, password: regPass, name: regName });
        localStorage.setItem('users_db', JSON.stringify(currentUsers));
        
        showFeedback("success", "¡Cuenta registrada con éxito! Volviendo al inicio...");
        registerForm.reset();
        
        // Redirigir de forma automática al login tras segundo y medio
        setTimeout(() => { window.location.href = "index.html"; }, 1500);
    });
}

// ==========================================================================
// 5. CONTROL CENTRALIZADO DEL MODO OSCURO
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggleBtn) themeToggleBtn.innerHTML = "Modo Claro";
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = "Modo Oscuro";
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = " Modo Claro";
        }
    });
}
