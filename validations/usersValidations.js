const Joi = require ('joi')

const userValidationsBody = Joi.object({
    firstName: Joi.string().min(1).regex(/^[a-zA-Z0-9\s ]{3,30}$/).required(),
    lastName : Joi.string().min(1).regex(/^[a-zA-Z0-9\s ]{3,30}$/).required(),
    userName: Joi.string(), // no es requerido porque se crea dentro del controlador del PostUser 
    password: Joi.string().alphanum().min(3).max(10).required(),
    email: Joi.string().email().required()
})

const userValidationsQuery = Joi.object({
    firstName: Joi.string().min(1).alphanum(),
    lastName: Joi.string().min(1).alphanum(),
    userName: Joi.string().min(3),
    email: Joi.string().email()
})
      
const userValidationsParams = Joi.object({
    userId:Joi.string().length(24).required()
})
      
const userValidationsPut = Joi.object({
    firstName: Joi.string().min(1).alphanum(),
    lastName: Joi.string().min(1).alphanum(),
    userName: Joi.string().min(3),
    password: Joi.string().alphanum().min(3).max(10),
    email: Joi.string().email()
})
      
const userValidationsLogin = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required()
})
      
module.exports = {userValidationsBody, userValidationsQuery ,userValidationsParams, userValidationsPut,userValidationsLogin}