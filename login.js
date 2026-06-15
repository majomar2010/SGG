// ==========================================================================
// 1. BASE DE DATOS DE USUARIOS (Requisito Obligatorio)
// ==========================================================================
const USERS_DATABASE = [
    { username: "analistaQA", password: "password123", name: "Analista de Calidad" },
    { username: "sebastian", password: "sggProyecto1", name: "José Sebastián" }
];

// ==========================================================================
// 2. INTERRUPTOR DE PESTAÑAS (Login vs Registro)
// ==========================================================================
const tabLogin = document.getElementById('tab-login');
const tabRegister = document.getElementById('tab-register');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const messageBox = document.getElementById('form-message');

function clearMessages() {
    messageBox.className = "message-box";
    messageBox.textContent = "";
}

tabLogin.addEventListener('click', () => {
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    clearMessages();
});

tabRegister.addEventListener('click', () => {
    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    clearMessages();
});

// ==========================================================================
// 3. PROCESAMIENTO DE INICIO DE SESIÓN
// ==========================================================================
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessages();
    
    const userIn = document.getElementById('username').value.trim();
    const passIn = document.getElementById('password').value.trim();
    
    if (!userIn || !passIn) {
        showFeedback("error", "Por favor, completa todos los campos.");
        return;
    }

    const account = USERS_DATABASE.find(u => u.username.toLowerCase() === userIn.toLowerCase());

    if (!account) {
        showFeedback("error", "El usuario no está registrado. ¡Crea una cuenta al lado!");
        return;
    }

    if (account.password !== passIn) {
        showFeedback("error", "Contraseña incorrecta.");
        return;
    }

    showFeedback("success", `¡Bienvenido de vuelta, ${account.name}!`);
});

// ==========================================================================
// 4. PROCESAMIENTO DE NUEVOS REGISTROS
// ==========================================================================
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessages();
    
    const regName = document.getElementById('reg-name').value.trim();
    const regUser = document.getElementById('reg-username').value.trim();
    const regPass = document.getElementById('reg-password').value.trim();
    
    if (!regName || !regUser || !regPass) {
        showFeedback("error", "Todos los campos de registro son obligatorios.");
        return;
    }
    
    if (regPass.length < 6) {
        showFeedback("error", "La contraseña debe tener al menos 6 caracteres.");
        return;
    }
    
    const userExists = USERS_DATABASE.some(u => u.username.toLowerCase() === regUser.toLowerCase());
    if (userExists) {
        showFeedback("error", "Ese nombre de usuario ya está tomado.");
        return;
    }
    
    USERS_DATABASE.push({ username: regUser, password: regPass, name: regName });
    
    showFeedback("success", "¡Cuenta creada con éxito! Ya podés iniciar sesión.");
    registerForm.reset();
    
    setTimeout(() => { tabLogin.click(); }, 1500);
});

function showFeedback(type, text) {
    messageBox.textContent = text;
    messageBox.className = `message-box ${type}`;
}

// ==========================================================================
// 5. CONTROL DEL MODO OSCURO (Persistente en LocalStorage)
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeButton(true);
}

themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateThemeButton(false);
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeButton(true);
    }
});

function updateThemeButton(isDark) {
    themeToggleBtn.setAttribute('aria-pressed', isDark);
    themeToggleBtn.innerHTML = isDark ? 
        '<span class="icon" aria-hidden="true">☀️</span> MODO CLARO' : 
        '<span class="icon" aria-hidden="true">🌙</span> MODO OSCURO';
}
