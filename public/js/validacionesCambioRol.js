document.getElementById('adminRoleForm').addEventListener('submit', function (event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let newRole = document.getElementById('newRole').value;
  
    fetch('/usuario/perfil', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, newRole: newRole })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: data.message
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: data.message
          });
        }
    })
  });
  