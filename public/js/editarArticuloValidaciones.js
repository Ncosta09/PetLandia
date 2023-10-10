window.addEventListener("load", function () {
    const nombreInput = document.getElementById("name");
    const nombreError = document.getElementById("nombreError");

    const precioInput = document.getElementById("Price");
    const precioError = document.getElementById("precioError");

    const descuentoInput = document.getElementById("Discount");
    const descuentoError = document.getElementById("descuentoError");

    const stockInput = document.getElementById("Stock");
    const stockError = document.getElementById("stockError");

    const envioInput = document.getElementById("shiping");
    const envioError = document.getElementById("envioError");

    const descripcionInput = document.getElementById("Description");
    const descripcionError = document.getElementById("descripcionError");

    const fotoPerfilInput = document.getElementById("foto_perfil");
    const fotoError = document.getElementById("fotoError");

    const form = document.getElementById("editar-form"); // Obtén el formulario

    // Agrega eventos blur a los campos de entrada
    nombreInput.addEventListener('blur', () => validarCampo(nombreInput, nombreError, "El campo Nombre es obligatorio"));
    precioInput.addEventListener('blur', () => validarPrecio(precioInput, precioError));
    descuentoInput.addEventListener('blur', () => validarDescuento(descuentoInput, descuentoError));
    stockInput.addEventListener('blur', () => validarStock(stockInput, stockError));
    envioInput.addEventListener('blur', () => validarEnvio(envioInput, envioError));
    descripcionInput.addEventListener('blur', () => validarCampo(descripcionInput, descripcionError, "El campo Descripción es obligatorio"));
    fotoPerfilInput.addEventListener('blur', () => validarFotoProducto(fotoPerfilInput, fotoError));

    // Función para validar campos de texto
    function validarCampo(input, elementoError, mensajeError) {
        if (input.value.trim() === '') {
            elementoError.textContent = mensajeError;
        } else {
            elementoError.textContent = '';
        }
    }

    // Función para validar el precio
    function validarPrecio(input, elementoError) {
        const precio = parseFloat(input.value);
        if (isNaN(precio) || precio <= 0) {
            elementoError.textContent = "El precio debe ser un número mayor que cero";
        } else {
            elementoError.textContent = '';
        }
    }

    // Función para validar el descuento
    function validarDescuento(input, elementoError) {
        const descuento = parseFloat(input.value);
        if (isNaN(descuento) || descuento < 0 || descuento > 100) {
            elementoError.textContent = "El descuento debe ser un número entre 0 y 100";
        } else {
            elementoError.textContent = '';
        }
    }

    // Función para validar el stock
    function validarStock(input, elementoError) {
        const stock = parseInt(input.value);
        if (isNaN(stock) || stock <= 0) {
            elementoError.textContent = "El stock debe ser un número mayor a cero";
        } else {
            elementoError.textContent = '';
        }
    }

    // Función para validar el envio
    function validarEnvio(input, elementoError) {
        const stock = parseInt(input.value);
        if (isNaN(stock) || stock < 0) {
            elementoError.textContent = "El envío debe tener un costo mayor o igual a cero";
        } else {
            elementoError.textContent = '';
        }
    }

    // Función para validar la foto de producto
    function validarFotoProducto(input, elementoError) {
        const fotoProducto = input.files[0];
        if (!fotoProducto && !input.getAttribute('data-has-image')) {
            elementoError.textContent = "Debes seleccionar una foto de producto";
            hasErrors = true;
        } else if (!fotoProducto && input.getAttribute('data-has-image')) {
            elementoError.textContent = "";
        } else if (!esTipoValido(fotoProducto.type)) {
            elementoError.textContent = "La foto de producto contiene una extensión no permitida";
            hasErrors = true;
        } else {
            elementoError.textContent = "";
            input.setAttribute('data-has-image', 'true');
        }
    }

    function esTipoValido(tipoArchivo) {
        return /^image\/(jpeg|jpg|png)$/i.test(tipoArchivo);
    }

    // Agrega evento submit al formulario para evitar el envío si hay errores
    form.addEventListener("submit", function (event) {
        // Verifica si hay algún campo con errores
        const errores = document.querySelectorAll('.color-alert');
        let hasErrors = false;

        errores.forEach((error) => {
            if (error.textContent.trim() !== '') {
                hasErrors = true;
            }
        });

        if (hasErrors) {
            event.preventDefault(); // Prevenir el envío si hay errores
        }
    });
});