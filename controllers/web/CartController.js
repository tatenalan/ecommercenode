const Cart = require("../../models/Cart");

// twilio
const twilio = require('twilio')
const accountSid = 'AC23f2171f48cfe11a66834fd8b83da878'
const authToken = '97593086a93785b7745629c1c3c4a560'
const client = twilio(accountSid, authToken)

const createCart = async (userId) => {
    await Cart.create({userId:userId})
}

const getByUserId = async (req, res) => {
    try {
        const cart = await Cart.findOne({userId:req.session.userId})
        products = cart.products
        res.render('cart', {products})
    } catch (error) {
        throw new Error(`Error, can't get cart: ${error}`)
    }
}

const addToCart = async (req, res) => {
    try {
        Cart.findOne({userId:req.session.userId}).then((cart) => {
            if (cart) {
                let id = cart._id
                cart.updateOne({_id: id }, cart).then((response) => {
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

const purchase = async (req, res) => {
    try {
        Cart.findOne({userId:req.session.userId}).then((cart) => {
        
        // envío whatsapp por twilio
        client.messages.create({
                from: 'whatsapp:+14155238886',
                to:'whatsapp:+5491158291281',
                body: `el body ${JSON.stringify(cart.products)}`
        })
        .then(message => console.log(message.sid))
        .catch(e => console.log(e))

        return true
    })

    } catch (error) {
        console.log(error);
        return false
    }
    
}

module.exports = { createCart, getByUserId, addToCart, purchase }