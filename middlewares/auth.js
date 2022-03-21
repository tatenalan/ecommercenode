function auth(req, res, next) {
    // si existe la sesión almacenar en locals los datos para poder compartirla en todas las vistas
    if(req.session.username) {
        res.locals = {
            username : req.session.username,
            email : req.session.email,
            address : req.session.address,
            avatar : req.session.avatar
        };
        return next();
    }
    // return res.status(401).send('error de autorización')
    return res.redirect('login');
}

module.exports = { auth }