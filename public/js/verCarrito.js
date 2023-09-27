let usuarioIdentificacion = document.getElementById('userId').value;
let carrito = [];

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem(`carrito_${usuarioIdentificacion}`)) {
        carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioIdentificacion}`));
    }

    // Luego de cargar el carrito, muestra los productos en el carrito
    mostrarProductosEnCarrito();
});

function mostrarProductosEnCarrito() {
    const carritoContainer = document.querySelector('.product-list');

    carritoContainer.innerHTML = '';

    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');

        const eliminarBtn = document.createElement('button');
        eliminarBtn.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
        eliminarBtn.classList.add('eliminar-producto');

        eliminarBtn.addEventListener('click', function () {
            eliminarProducto(producto.nombre);
        });

        const imagenElement = document.createElement('img');
        imagenElement.src = producto.imagen;
        imagenElement.alt = producto.nombre;

        const nombreElement = document.createElement('h2');
        nombreElement.textContent = producto.nombre;

        const cantidadElement = document.createElement('p');
        cantidadElement.textContent = `${producto.cantidad}`;

        const precioElement = document.createElement('p');
        let precio = ((producto.precio) * producto.cantidad)
        precioElement.textContent = `$${precio.toFixed(2)}`;

        const precioTotalElement = document.querySelector('#id-total');
        let precioTotal = calcularPrecioTotal();
        precioTotalElement.textContent = `$${precioTotal.toFixed(2)}`;

        productoDiv.classList.add('info-product');
        imagenElement.classList.add('info-product-img');
        nombreElement.classList.add('info-product-name');
        cantidadElement.classList.add('info-product-cantidad');
        precioElement.classList.add('info-product-price');

        productoDiv.appendChild(imagenElement);
        productoDiv.appendChild(nombreElement);
        productoDiv.appendChild(cantidadElement);
        productoDiv.appendChild(precioElement);
        productoDiv.appendChild(eliminarBtn);


        carritoContainer.appendChild(productoDiv);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    mostrarProductosEnCarrito();
});

//Precio total
function calcularPrecioTotal() {
    let precioTotal = 0;

    for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i];
        const precioProducto = producto.precio * producto.cantidad;
        precioTotal += precioProducto;
    }

    return precioTotal;
}

function actualizarPrecioTotal() {
    let precioTotal = calcularPrecioTotal();
    precioTotalElement.textContent = `$${precioTotal.toFixed(2)}`;
}

//Borrar carrito
const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');

function guardarCarritoEnLocalStorage() {
    localStorage.setItem(`carrito_${usuarioIdentificacion}`, JSON.stringify(carrito));
}

function vaciarCarrito() {
    carrito = [];
    guardarCarritoEnLocalStorage();
    mostrarProductosEnCarrito();

    const precioTotalElement = document.querySelector('#id-total');
    precioTotalElement.textContent = `$${0.00}`;
}

btnVaciarCarrito.addEventListener('click', function() {
    vaciarCarrito(); 
});

//Eliminar individual
function eliminarProducto(nombre) {
    
    carrito = carrito.filter(producto => producto.nombre !== nombre);
    guardarCarritoEnLocalStorage();
    mostrarProductosEnCarrito();
}