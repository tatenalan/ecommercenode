const User = require("../../models/User");
const CartController = require("../../controllers/web/CartController");
const bcrypt = require('bcrypt');
const { sendEmail } = require('../../notifications/mails/welcomeMail');

const loginIndex = async (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        throw new Error(`${error}`)
    }
}

const login = async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({username:username})
  
    if(!user || !await bcrypt.compare(req.body.password, user.password)) {
        return res.send('login-error')
    }

    req.session.userId = user._id
    req.session.username = user.username
    req.session.email = user.email
    req.session.address = user.address
    req.session.avatar = user.avatar
    req.session.age = user.age
    req.session.phone = user.phone

    console.log(req.session);

    res.redirect('/')
}

const registerIndex = async (req, res) => {
    try {
        res.render('register');
    } catch (error) {
        throw new Error(`${error}`)
    }
}

const register = async (req, res) => {
    const salt = bcrypt.genSaltSync(4);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    if(req.file){
        req.body.avatar = req.file.filename
    }

    //creo el usuario
    User.create(req.body).then((user) => {
        // creo su carrito
        CartController.createCart(user._id).then(() => {
            // envío el email
            sendEmail(req.body);
        })
    });




    res.redirect('/login')
}

const logout = async (req, res) => {
    res.render('bye', {username: req.session.username})
    req.session.destroy()
}

const profileIndex = async (req,res) => {
    res.render('profile')
}

module.exports = { login, loginIndex, register, registerIndex, logout, profileIndex }