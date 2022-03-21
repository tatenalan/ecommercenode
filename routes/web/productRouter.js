const express = require('express')
const { Router } = express;

//controllers
const ProductController = require("../../controllers/web/ProductController")
const ProductFactory = require("../../factories/ProductFactory")

// middlewares
const auth = require('../../middlewares/auth').auth;

const productRouter = Router()

productRouter.get('/', auth, ProductController.getProducts)
productRouter.get('/products-test', auth, ProductFactory.createFakers)

module.exports = productRouter