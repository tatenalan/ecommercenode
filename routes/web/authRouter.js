const express = require('express')
const { Router } = express;
const AuthController = require("../../controllers/web/AuthController")
const { upload } = require("../../middlewares/multer")

// middlewares
const auth = require('../../middlewares/auth').auth;

const authRouter = Router()

authRouter.get('/login', AuthController.loginIndex)
authRouter.post('/login', AuthController.login)
authRouter.get('/register', AuthController.registerIndex)
authRouter.post('/register', upload.single('avatar'), AuthController.register)
authRouter.post('/logout', AuthController.logout)
authRouter.get('/profile', auth, AuthController.profileIndex)

module.exports = authRouter