document.getElementById('recover-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const messageBox = document.getElementById('form-message');
    messageBox.className = "message-box";

    const email = document.getElementById('rec-email').value.trim();
    const newPass = document.getElementById('rec-pass').value;

    let db = JSON.parse(localStorage.getItem('usuarios_sgg')) || [];
    const userIndex = db.findIndex(user => user.email === email);

    if (userIndex === -1) {
        messageBox.textContent = "El correo ingresado no pertenece a ningún usuario.";
        messageBox.className = "message-box error";
        return;
    }

    if (db[userIndex].password === newPass) {
        messageBox.textContent = "La nueva contraseña no puede ser igual a la actual.";
        messageBox.className = "message-box error";
        return;
    }

    // Guardar cambios en el array del navegador
    db[userIndex].password = newPass;
    localStorage.setItem('usuarios_sgg', JSON.stringify(db));

    messageBox.textContent = "¡Contraseña actualizada con éxito! Ya podés iniciar sesión.";
    messageBox.className = "message-box success";
    setTimeout(() => window.location.href = 'index.html', 2000);
});