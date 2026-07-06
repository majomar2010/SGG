const passwordInput = document.getElementById('reg-pass');
const passwordConfirm = document.getElementById('reg-pass2');
const submitBtn = document.getElementById('reg-submit-btn');
const registerForm = document.getElementById('register-form');
const messageBox = document.getElementById('form-message');

const reqs = {
    len: document.getElementById('req-len'),
    may: document.getElementById('req-may'),
    min: document.getElementById('req-min'),
    num: document.getElementById('req-num'),
    esp: document.getElementById('req-esp')
};

let passValid = false;

passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    
    const checks = {
        len: val.length >= 8,
        may: /[A-Z]/.test(val),
        min: /[a-z]/.test(val),
        num: /[0-9]/.test(val),
        esp: /[!@#$%^&*(),.?":{}|<>_+\-*/\[\]\\~`]/.test(val)
    };

    passValid = Object.values(checks).every(Boolean);

    // Actualizar interfaz visual (Rojo/Verde)
    for (const key in checks) {
        if (checks[key]) {
            reqs[key].className = 'valid';
            reqs[key].innerHTML = '✔ ' + reqs[key].innerHTML.substring(2);
        } else {
            reqs[key].className = '';
            reqs[key].innerHTML = '❌ ' + reqs[key].innerHTML.substring(2);
        }
    }
    submitBtn.disabled = !passValid;
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageBox.className = "message-box";

    const name = document.getElementById('reg-name').value.trim();
    const lastname = document.getElementById('reg-lastname').value.trim();
    const dateVal = document.getElementById('reg-date').value;
    const email = document.getElementById('reg-email').value.trim();
    const p1 = passwordInput.value;
    const p2 = passwordConfirm.value;

    // Validación de nombres (sin caracteres raros)
    const nameRegex = /^[A-Za-zÁéíóúáéíóúÑñ ]+$/;
    if (!nameRegex.test(name) || !nameRegex.test(lastname)) {
        showFeedback("error", "Nombre y Apellido no deben contener números ni símbolos.");
        return;
    }

    // Validación edad (+14)
    const birthDate = new Date(dateVal);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    
    if (age < 14) {
        showFeedback("error", "Debes ser mayor de 14 años para registrarte.");
        return;
    }

    // RegEx corporativo estricto
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        showFeedback("error", "Estructura de correo inválida.");
        return;
    }

    if (p1 !== p2) {
        showFeedback("error", "Las contraseñas no coinciden.");
        return;
    }

    let db = JSON.parse(localStorage.getItem('usuarios_sgg')) || [];
    if (db.some(user => user.email === email)) {
        showFeedback("error", "El correo ya está registrado.");
        return;
    }

    db.push({ email, password: p1, name, lastname });
    localStorage.setItem('usuarios_sgg', JSON.stringify(db));
    showFeedback("success", "¡Registro exitoso! Redireccionando al Login...");
    setTimeout(() => window.location.href = 'index.html', 2000);
});

function showFeedback(type, text) {
    messageBox.textContent = text;
    messageBox.className = `message-box ${type}`;
}