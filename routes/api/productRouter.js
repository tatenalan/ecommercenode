const express = require("express")
const { Router } = express;

//controllers
const ProductController = require("../../controllers/api/ProductController")
const ProductFactory = require("../../factories/ProductFactory")

// middlewares
const auth = require('../../middlewares/auth').auth;

const productRouter = Router()

productRouter.get('/', auth, ProductController.getProducts)
productRouter.get('/products-test', auth, ProductFactory.createFakers)
productRouter.get('/:id', auth, ProductController.getProduct)
productRouter.post('/', auth, ProductController.insertProduct)
productRouter.put('/:id', auth, ProductController.updateProduct)
productRouter.delete('/:id', auth, ProductController.deleteProduct)
productRouter.delete('/', auth, ProductController.deleteAll)

module.exports = productRouter