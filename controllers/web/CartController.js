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
                console.log(cart);
                cart.products.push(req.body)
                console.log(cart);   
                cart.replaceOne({_id: id}, cart).then((response) => {
                    console.log(response);
                    console.log('ok');
                }).catch((error) => {
                    console.log(error);
                    console.log('errorrr!!I428y427');
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