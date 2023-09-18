window.addEventListener("load", function() {
    const formulario = document.getElementById("registroForm");
  
    formulario.addEventListener("submit", function(event) {
      const nombre = document.getElementById("name").value;
      const nombreError = document.getElementById("nombreError");
  
      const apellido = document.getElementById("surname").value;
      const apellidoError = document.getElementById("apellidoError");
  
      const email = document.getElementById("email").value;
      const emailError = document.getElementById("emailError");
  
      const telefono = document.getElementById("telefono").value;
      const telefonoError = document.getElementById("telefonoError");
  
      const contrasena = document.getElementById("password").value;
      const confirmarContrasena = document.getElementById("confirmar_password").value;
      const contrasenaError = document.getElementById("contrasenaError");
  
      const fotoPerfilInput = document.getElementById("foto_perfil");
      const fotoPerfilError = document.getElementById("fotoPerfilError");
  
      // Función para realizar la validación de un campo
      function validarCampo(valor, elementoError, mensajeError) {
        if (valor.trim() == "") {
          event.preventDefault();
          elementoError.textContent = mensajeError;
        } else {
          elementoError.textContent = "";
        }
      }
  
      // Validaciones de cada campo
      validarCampo(nombre, nombreError, "El campo Nombre es obligatorio.");
      validarCampo(apellido, apellidoError, "El campo Apellido es obligatorio.");
  
      if (!email.includes("@")) {
        event.preventDefault();
        emailError.textContent = "Ingresa un correo electrónico válido.";
      } else {
        emailError.textContent = "";
      }
  
        /*
        ^ Este símbolo denota el inicio de la cadena. 
        \d representa que sean digitos numerigos
        {10} q sean 10 digitos
        $ representa el fin de la cadena
        */

      const telefonoRegex = /^\d{10}$/; 
      if (!telefono.match(telefonoRegex)) {
        event.preventDefault();
        telefonoError.textContent = "Ingresa un número de teléfono válido.";
      } else {
        telefonoError.textContent = "";
      }
  
      if (contrasena != confirmarContrasena) {
        event.preventDefault();
        contrasenaError.textContent = "Las contraseñas no coinciden.";
      } else {
        contrasenaError.textContent = "";
      }
  
      const fotoPerfil = fotoPerfilInput.files[0];
      if (!fotoPerfil) {
        event.preventDefault();
        fotoPerfilError.textContent = "Debes seleccionar una foto de perfil.";
      } else if (!esTipoValido(fotoPerfil.type)) {
        event.preventDefault();
        fotoPerfilError.textContent = "La foto de perfil debe ser una imagen (por ejemplo, JPG, PNG).";
      } else {
        fotoPerfilError.textContent = "";
      }
    });
  });
  
  function esTipoValido(tipoArchivo) {
    return /^image\/(jpeg|jpg|png)$/i.test(tipoArchivo);
  }
  