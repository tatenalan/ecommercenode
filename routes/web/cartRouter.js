const express = require('express')
const { Router } = express;

//controllers
const CartController = require("../../controllers/web/CartController")

// middlewares
const auth = require('../../middlewares/auth').auth;

const cartRouter = Router()

cartRouter.get('/', auth, CartController.getByUserId)
cartRouter.post('/addToCart', auth, CartController.addToCart)

module.exports = cartRouter