const mongoose = require('mongoose')
const { Schema } = mongoose


// Usamos un objeto Schema para definir una lista de propiedades del documento/collection.
// Tambien usamos un modelo constructor para poder crear instancias de los documentos/collections.
const Cart = mongoose.model('Cart', new Schema(
    {
        userId:
        {
            type:String,
            unique: true,
            required: true
        },
        products: {
            type: [],
            required: false
        },
    }))

module.exports = Cart
