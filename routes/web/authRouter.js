const express = require('express')
const { Router } = express;
const AuthController = require("../../controllers/web/AuthController")

// middlewares
const auth = require('../../middlewares/auth').auth;



// multer para subir avatars -- Sacar y agregarlo conmo middleware
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/avatars') // para setear el destino
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) // para setear el nombre
    }
})

const upload = multer({ storage }) // storage es nuestra configuración

const authRouter = Router()

authRouter.get('/login', AuthController.loginIndex)
authRouter.post('/login', AuthController.login)
authRouter.get('/register', AuthController.registerIndex)
authRouter.post('/register', upload.single('avatar'), AuthController.register)
authRouter.post('/logout', AuthController.logout)
authRouter.get('/profile', auth, AuthController.profileIndex)

module.exports = authRouter