const mainRoutes = require('./../src/routes/mainRoutes');
const productRoutes = require('./../src/routes/productRoutes');
const userRoutes = require('./../src/routes/userRoutes');

const express = require('express');
const path = require('path');

const app = express();

const publicpath = path.resolve(__dirname, '../public');

app.use(express.static(publicpath));

app.set('views', path.resolve(__dirname, 'views'));

app.use('/', mainRoutes);

app.use('/', productRoutes);

app.use('/', userRoutes);

app.set('view engine', 'ejs');

app.listen(3200, () => {
    console.log("Servidor corriendo en el puerto 3200");
});
