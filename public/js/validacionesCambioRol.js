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
          alert(data.message);
        } else {
          alert(data.message);
        }
    })
  });
  