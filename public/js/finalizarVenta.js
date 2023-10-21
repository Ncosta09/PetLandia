document.getElementById('btnFinalizarVenta').addEventListener('click', function() {
    
    let usuarioIdentificacion = document.getElementById('userId').value;
    let carrito = [];

    if (localStorage.getItem(`carrito_${usuarioIdentificacion}`)) {
        carrito = JSON.parse(localStorage.getItem(`carrito_${usuarioIdentificacion}`));
    }
  
    if (!carrito || carrito.length === 0) {
      alert('El carrito está vacío. Agrega productos antes de finalizar la venta.');
      return;
    }
  
    const datosVenta = {
      carrito: carrito,
    };
  
    fetch('/producto/finalizarVenta', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosVenta),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.mensaje);
    })
});