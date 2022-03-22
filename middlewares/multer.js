// multer para subir avatars -- Sacar y agregarlo conmo middleware
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/avatars') // para setear el destino
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) // para setear el nombre
    }
})

const upload = multer({ storage }) // storage es nuestra configuración

module.exports = { upload }