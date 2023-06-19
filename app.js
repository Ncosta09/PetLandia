const express = require('express');
const path = require('path');

const app = express();

const publicpath = path.resolve(__dirname, './public');
app.use( express.static(publicpath) );

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
});

app.get('/producto', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/producto.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'));
});

app.listen(3200, () => {
    console.log("Servidor corriendo en el puerto 3200");
});
