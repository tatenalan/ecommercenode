const mongoose = require('mongoose')
const { Schema } = mongoose

const User = mongoose.model('User', new Schema({
    username: 
    {
        type:String,
        unique: true
    },
    address: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    phone: Number,
    avatar: String,
    password:String
}))

module.exports = User





// EJEMPLO
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     unique: true // `email` must be unique
//   }
// });
// const User = mongoose.model('User', userSchema);