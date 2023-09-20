window.addEventListener("load", function() {
    const nombreInput = document.getElementById("name");
    const nombreError = document.getElementById("nombreError");

    const apellidoInput = document.getElementById("surname");
    const apellidoError = document.getElementById("apellidoError");

    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");

    const telefonoInput = document.getElementById("telefono");
    const telefonoError = document.getElementById("telefonoError");

    const contrasenaInput = document.getElementById("password");
    const confirmarContrasenaInput = document.getElementById("confirmar_password");
    const contrasenaError = document.getElementById("contrasenaError");

    const fotoPerfilInput = document.getElementById("foto_perfil");
    const fotoPerfilError = document.getElementById("fotoPerfilError");

    // Agrega eventos blur a los campos de entrada
    nombreInput.addEventListener('blur', () => validarCampo(nombreInput, nombreError, "El campo Nombre es obligatorio"));
    apellidoInput.addEventListener('blur', () => validarCampo(apellidoInput, apellidoError, 
    "El campo Apellido es obligatorio"));
    emailInput.addEventListener('blur', validarEmail);
    telefonoInput.addEventListener('blur', validarTelefono);
    contrasenaInput.addEventListener('blur', validarContrasena);
    confirmarContrasenaInput.addEventListener('blur', validarContrasena);
    fotoPerfilInput.addEventListener('blur', validarFotoPerfil);

    // Función para realizar la validación de un campo
    function validarCampo(input, elementoError, mensajeError) {
        if (input.value.trim() === '') {
            elementoError.textContent = mensajeError;
        } else {
            elementoError.textContent = '';
        }
    }

    function validarEmail() {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = "Ingresa un correo electrónico válido";
        } else {
            emailError.textContent = "";
        }
    }

    function validarTelefono() {
        const telefonoRegex = /^\d{10}$/; 
        if (!telefonoRegex.test(telefonoInput.value)) {
            telefonoError.textContent = "Ingresa un número de teléfono válido";
        } else {
            telefonoError.textContent = "";
        }
    }

    function validarContrasena() {
        const contrasena = contrasenaInput.value;
        const confirmarContrasena = confirmarContrasenaInput.value;

        if (contrasena !== confirmarContrasena) {
            contrasenaError.textContent = "Las contraseñas no coinciden";
        } else {
            contrasenaError.textContent = "";
        }
    }

    function validarFotoPerfil() {
        const fotoPerfil = fotoPerfilInput.files[0];
        if (!fotoPerfil) {
            fotoPerfilError.textContent = "Debes seleccionar una foto de perfil";
        } else if (!esTipoValido(fotoPerfil.type)) {
            fotoPerfilError.textContent = "La foto de perfil contiene una extencion no permitida";
        } else {
            fotoPerfilError.textContent = "";
        }
    }

    function esTipoValido(tipoArchivo) {
        return /^image\/(jpeg|jpg|png)$/i.test(tipoArchivo);
    }
});
