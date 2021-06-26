const express = require('express')
const validator = require ('express-joi-validation').createValidator()
const userControllers = require('../controllers/userControllers')
const userValidations = require ('../validations/usersValidations')
const checkToken = require ('../checkToken')

const routes = (User)=>{
    const userRouter = express.Router()
    const controller = userControllers(User)

    userRouter.route('/users')
      .get(checkToken,
        validator.query(userValidations.userValidationsQuery), 
        controller.getUsers
      ) 
      .post(
        validator.body(userValidations.userValidationsBody), 
        controller.postUser
      )

    userRouter.route('/users/:userId')
      .get(checkToken,
        validator.params(userValidations.userValidationsParams), 
        controller.getUserById
      )
      .put(checkToken,
        validator.params(userValidations.userValidationsParams), 
        validator.body(userValidations.userValidationsPut), 
        controller.putUser
      )
      .delete(checkToken,
        validator.params(userValidations.userValidationsParams), 
        controller.deleteUser
      )
        
    userRouter.route('/users/login')
      .post(
        validator.body(userValidations.userValidationsLogin),
        controller.postUserLogin
      )
     
  
  return userRouter
}

module.exports = routes