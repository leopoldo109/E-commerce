const express = require('express')
const app = express()
const path = require('path')
const port = 8000
const session = require('express-session')


const homeController = require('./controller/HomeController');

const loginController = require('./controller/LoginController');
const registerController = require('./controller/RegisterController');
const logoutController = require('./controller/LogoutController');

const ayudaController = require ('./controller/Ayudacontroller')
const perfilController = require('./controller/PerfilController')
const compraController = require('./controller/CompraController');
const productosController = require('./controller/ProductosController');
const carritoController = require('./controller/CarritoController');
const creadorController = require ('./controller/CreadorController')

const ordenController = require ('./controller/ordenController')


const authMiddleware= require('./controller/authMiddleware');

const apireset= require('./controller/apireset')

//configuracion
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.use(session({
    secret: 'pato',
    resave: false,
    saveUninitialized: true,
}));
app.use(express.urlencoded({extended:false}));

//redirecciones

app.get('/', homeController.home);

app.get('/login', loginController.login);

// app.get('/orden', ordenController.getAll);


app.post('/login', loginController.logeo);

app.get('/register', registerController.register);

app.post('/register', registerController.registrado);

app.get('/perfil', authMiddleware, perfilController.getAll);

app.get('/logout', logoutController.logout);

app.get('/compra', compraController.compra);

app.get('/ayuda', ayudaController.ayuda);

app.get('/productos', productosController.getAll);

app.get('/carrito', /*authMiddleware ,*/carritoController.carrito);

//traer producto al carrito

app.get("/product/:id", apireset.product)

app.post("/checkout", apireset.checkout)

app.get("/order/:id", ordenController.order)

app.get('/creador', creadorController.creador);

app.post('/files',creadorController.upload, creadorController.create);



app.get('*', homeController.notfound);



app.listen(port);
console.log("Esta ejecutando el server: " + "http://localhost:"+port);