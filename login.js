// Inyectar usuarios iniciales si el LocalStorage está vacío
if (!localStorage.getItem('usuarios_sgg')) {
    const iniciales = [
        { email: "analistaqa@sgg.com", password: "Password123!", name: "Analista", lastname: "Calidad" },
        { email: "sebastian@sgg.com", password: "SggProyecto1!", name: "José", lastname: "Sebastián" }
    ];
    localStorage.setItem('usuarios_sgg', JSON.stringify(iniciales));
}

const loginForm = document.getElementById('login-form');
const messageBox = document.getElementById('form-message');
const submitBtn = document.getElementById('submit-btn');
let loginAttempts = 0;

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageBox.className = "message-box";
    messageBox.textContent = "";

    const emailInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value;

    if (!emailInput || !passwordInput) {
        showFeedback("error", "Por favor, completa todos los campos.");
        return;
    }

    const db = JSON.parse(localStorage.getItem('usuarios_sgg'));
    const userFound = db.find(user => user.email === emailInput);

    if (!userFound) {
        showFeedback("error", "El correo ingresado no está registrado.");
        return;
    }

    if (userFound.password !== passwordInput) {
        loginAttempts++;
        if (loginAttempts >= 3) {
            submitBtn.disabled = true;
            showFeedback("error", "Demasiados intentos. Bloqueado por 30 segundos.");
            setTimeout(() => {
                submitBtn.disabled = false;
                loginAttempts = 0;
                showFeedback("success", "Ya podés volver a intentarlo.");
            }, 30000);
        } else {
            showFeedback("error", `Contraseña incorrecta. Intentos restantes: ${3 - loginAttempts}`);
        }
        return;
    }

    loginAttempts = 0;
    showFeedback("success", `¡Bienvenido/a, ${userFound.name}! Entrando...`);
});

function showFeedback(type, text) {
    messageBox.textContent = text;
    messageBox.className = `message-box ${type}`;
}