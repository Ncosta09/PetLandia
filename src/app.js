const express = require('express');
const path = require('path');

const app = express();

const publicpath = path.resolve(__dirname, '../public');
app.use(express.static(publicpath));
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/producto', (req, res) => {
    res.render(path.resolve(__dirname, './src/views/producto'));
});

app.get('/login', (req, res) => {
    res.render(path.resolve(__dirname, './src/views/login'));
});

app.get('/register', (req, res) => {
    res.render(path.resolve(__dirname, './src/views/register'));
});

app.get('/carrito', (req, res) => {
    res.render(path.resolve(__dirname, './src/views/carrito'));
});

app.listen(3200, () => {
    console.log("Servidor corriendo en el puerto 3200");
});
