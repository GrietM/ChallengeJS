const mongoose = require("mongoose")
const {Schema} =  mongoose

const userModel = new Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String , required: true},
    userName: {type: String}, // no es requerido porque se crea dentro del controlador del PostUser
    password: {type: String , required: true},
    email: {type: String , required: true},
},
{
  collection: 'users'
})

module.exports = mongoose.model( "User", userModel)