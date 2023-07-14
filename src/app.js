const mainRoutes = require('./../src/routes/mainRoutes');
const productRoutes = require('./../src/routes/productRoutes');
const userRoutes = require('./../src/routes/userRoutes');

const express = require('express');
const path = require('path');

const methodOverride = require('method-override');

const app = express();

const publicpath = path.resolve(__dirname, '../public');

app.use(express.static(publicpath));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(methodOverride('_method'));


app.set('views', path.resolve(__dirname, 'views'));

app.use('/', mainRoutes);
app.use('/producto', productRoutes);
app.use('/usuario', userRoutes);

app.set('view engine', 'ejs');

app.listen(3200, () => {
    console.log("Servidor corriendo en el puerto 3200");
});
