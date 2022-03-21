const mongoose = require('mongoose')
const { Schema } = mongoose


// Usamos un objeto Schema para definir una lista de propiedades del documento/collection.
// Tambien usamos un modelo constructor para poder crear instancias de los documentos/collections.
const Cart = mongoose.model('Cart', new Schema(
    {
        products: {

        },
    }))

module.exports = Cart
