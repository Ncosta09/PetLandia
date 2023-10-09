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
        let productDiscount = document.querySelector('#id-descuento');
        if(productDiscount == 0 || productDiscount == null){
            productDiscount = 0;
        }else{
            productDiscount = parseFloat(document.querySelector('#id-descuento').textContent.replace('% OFF', '').trim());
        }
        let productQuantity = parseInt(document.querySelector('#id-cantidad').value);
        let productShip = document.querySelector('#id-envio');
        if(productShip == 0 || productShip == null){
            productShip = 0;
        }else{
            productShip = parseFloat(document.querySelector('#id-envio').textContent.replace('$', '').trim());
        }
        let productImage = document.querySelector('#id-imagen').src;
        
        const producto = {
            id: productId,
            nombre: productName,
            precio: productDiscount ? (productPrice - (productPrice * productDiscount / 100)) : productPrice,
            descuento: productDiscount ? productDiscount : 0,
            cantidad: productQuantity,
            envio: productShip,
            imagen: productImage
        };

        console.log(producto)

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