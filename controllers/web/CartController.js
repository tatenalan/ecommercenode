const Cart = require("../../models/Cart");

const createCart = async (userId) => {
    await Cart.create({userId:userId})
}

const getByUserId = async (req, res) => {
    try {
        const cart = await Cart.find({userId:req.session.userId})
        res.render('cart', cart)
    } catch (error) {
        throw new Error(`Error, can't get cart: ${error}`)
    }
}

const addToCart = async (req, res) => {
    try {
        Cart.findOne({userId:req.session.userId}).then((cart) => {
            if (cart) {
                let id = cart._id
                cart.products.push(req.body)
                let products = cart.products
                cart.replaceOne({_id: id, userId: req.session.userId, products: products }, cart).then((response) => {
                }).catch((error) => {                  
                    console.log('errorrr!!');
                })  
                res.json(cart)   
            } else {
                console.log('error!!');
            }
        })
    } catch (error) {
        console.log('error', error);
    }
}

module.exports = { createCart, getByUserId, addToCart }