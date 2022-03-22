const express = require("express");
const mongoose = require('mongoose');
const ServiceException = require("./exceptions/ServiceException");
const config = require("./config");

// rutas
const productRouterApi = require('./routes/api/productRouter');
const productRouter = require('./routes/web/productRouter');
const messageRouterApi = require('./routes/api/messageRouter');
const messageRouter = require('./routes/web/messageRouter');
const authRouter = require('./routes/web/authRouter');
const cartRouter = require('./routes/web/cartRouter');

// multer para subir avatars
// const multer = require('multer');

// plantillas
const handlebars = require('express-handlebars');

// para usar sesiones
const session = require('express-session')

// para guardar los datos de sesion en un file dentro de la carpeta sessions
const sessionFile = require('session-file-store');
const FileStore = sessionFile(session)

// para guardar los datos de sesion en Mongo Atlas
const MongoStore = require('connect-mongo')

// para utilizar websockets
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');


//------------------------------------------------------------------------
// configuro la DB

// Mongo DB local
// const URL = "mongodb://localhost:27017/desafio11";
// mongoose.connect(URL, () => console.log(`MongoDB connected`))

// Mongo Atlas
const URL = config.DB_URL;
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
},err => {
    if(err) console.log(`Error connecting Mongo Atlas ${err}`)
    console.log(`Mongo Atlas connected`)
})



//------------------------------------------------------------------------
// instancias

const app = express();

// chat
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// session. 
// Usamos FileStore para persistir la sesión en desarrollo. (por los reinicios del server)
// o bien Mongostore.Create para persistir en la DB de la nube
// para mantener la sesion viva si el usuario esta activo, colocar rolling: true y resave: true
app.use(session({
    // store: new FileStore(),
    store: MongoStore.create({mongoUrl: URL}),
    secret: 'secreto',
    resave: true,
    rolling: true,
    saveUninitialized: true,
    // cookie: { maxAge: 60000 } // 60 segundos
}))


//------------------------------------------------------------------------
// configuro el servidor

//PORT - Server
const PORT = config.PORT;
// Arrancamos el servidor con http.listen() en lugar de app.listen()
const server = httpServer.listen(PORT, () => console.log(`Running on ${PORT}`))
server.on('error', error => console.log(`Error on server ${error}`))



//------------------------------------------------------------------------
// Llamo a las rutas

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// configura nuestro directorio estático
app.use(express.static(__dirname + '/public'));

// defino el motor de plantillas (habdlebars)
app.engine('handlebars', handlebars.engine())
// especifica la carpeta de plantillas (handlebars)
app.set('views', './public')
app.set('view engine', 'handlebars')


app.use('/api/products', productRouterApi)
app.use('/products', productRouter)
app.use('/api/messages', messageRouterApi)
app.use('/messages', messageRouter)
app.use('/cart', cartRouter)
app.use('/', authRouter)

// ruta root
app.get('/', require('./middlewares/auth').auth, (req, res) => {
    res.render('index')
})

// ruta 404
app.get('*', (req, res) => {
    res.status(404);
    res.json(new ServiceException(-2, `The route ${req.originalUrl} with method ${req.method} does not exist`))
})







// 'connection' se ejecuta la primera vez que se abre una nueva conexión
io.on('connection', (socket) => {
    // console.log("usuario conectado");

    // recibimos un mensaje del front
    socket.on("newMessage", message => {
        //  lo guardamos en nuestro array de mensajes para mostrarselo a los nuevos usuarios que ingresen a través del socket "messages"
        Message.create(message)
        console.log('mensaje guardado');
        // Emitimos a todos los clientes
        io.sockets.emit("messages", message)   
    })
})