let usuarioIdentificacion = document.getElementById('userId').value;
const agregarAlCarrito = document.querySelectorAll('#btnAgregar');

let carrito = [];

if (localStorage.getItem(`carrito_${usuarioIdentificacion}`)) {
    carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioIdentificacion}`));
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem(`carrito_${usuarioIdentificacion}`, JSON.stringify(carrito));
}

agregarAlCarrito.forEach(button => {
    button.addEventListener('click', function(event) {
        let productId = document.querySelector('#id-item').value;
        let productName = document.querySelector('#id-nombre').textContent;
        let productPrice = parseFloat(document.querySelector('#id-precio').textContent.replace('$', '').trim());
        let productDiscount = parseFloat(document.querySelector('#id-descuento').textContent.replace('% OFF', '').trim());
        let productQuantity = parseInt(document.querySelector('#id-cantidad').value);
        let productImage = document.querySelector('#id-imagen').src;
        
        const producto = {
            id: productId,
            nombre: productName,
            precio: productDiscount ? (productPrice - (productPrice * productDiscount / 100)) : productPrice,
            descuento: productDiscount,
            cantidad: productQuantity,
            imagen: productImage
        };

        let productoExistente;

        for (let i = 0; i < carrito.length; i++) {
            if (carrito[i].nombre == producto.nombre) {
                productoExistente = carrito[i];
            }
        }

        if (productoExistente) {
            productoExistente.cantidad += productQuantity;
        } else {
            carrito.push(producto);
        }

        guardarCarritoEnLocalStorage();
    });
});