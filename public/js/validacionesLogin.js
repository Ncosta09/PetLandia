document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const contrasenaInput = document.getElementById("contrasena");
  const emailError = document.querySelector(".color-alert");
  const contrasenaError = document.getElementById("passError");

  emailInput.addEventListener("blur", validarEmail);
  contrasenaInput.addEventListener("blur", validarContrasena);

  function validarEmail() {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailValue === "") {
      emailError.textContent = "El campo Email es obligatorio";
    } else if (!emailRegex.test(emailValue)) {
      emailError.textContent = "Ingresa un correo electrónico válido";
    } else {
      emailError.textContent = "";
    }
  }

  function validarContrasena() {
    const contrasenaValue = contrasenaInput.value.trim();

    if (contrasenaValue === "") {
      contrasenaError.textContent = "El campo Contraseña es obligatorio";
    }
  }
});
