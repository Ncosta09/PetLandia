const mainRoutes = require('./../src/routes/mainRoutes');
const productRoutes = require('./../src/routes/productRoutes');
const servicesRoutes = require('./../src/routes/servicesRoutes');
const userRoutes = require('./../src/routes/userRoutes');
const apiRoutes = require('./../src/routes/apiRoutes');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

const methodOverride = require('method-override');
const express = require('express');
const session = require('express-session'); //express-session, con cookie session se rompe el login
const cookies = require('cookie-parser');

const path = require('path');
const app = express();
const cors = require('cors');

app.use(express.urlencoded({extended: false}));

const publicpath = path.resolve(__dirname, '../public');

app.use(express.static(publicpath));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: false,
}));

app.use(cors());
app.use(cookies());
app.use(userLoggedMiddleware);

app.set('views', path.resolve(__dirname, 'views'));

app.use('/', mainRoutes);
app.use('/producto', productRoutes);
app.use('/servicios', servicesRoutes);
app.use('/usuario', userRoutes);
app.use('/api', apiRoutes);

app.set('view engine', 'ejs');

app.listen(3100, () => {
    console.log("Servidor corriendo en el puerto 3100");
});
