const express = require('express')
const validator = require ('express-joi-validation').createValidator()
const operationControllers = require('../controllers/operationControllers')
const operationValidations = require ('../validations/operationsValidations')
const checkToken = require ('../checkToken')

const routes = (Operation) => {
  const operationRouter = express.Router()
  const controller = operationControllers(Operation)

  operationRouter.route('/operations')
    .get (checkToken,
        validator.query(operationValidations.operationValidationsQuery), 
        controller.getOperations)  //getOperationsByUser
    .post (checkToken,
      validator.body(operationValidations.operationValidationsBody),
      controller.postOperation) 
  
  operationRouter.route('/operationsbytype')
    .get (checkToken,
      validator.query(operationValidations.operationValidationsQuery), 
      controller.getOperationsByType)  

  operationRouter.route('/balance')
  .get (checkToken,
    validator.query(operationValidations.operationValidationsQuery), 
    controller.operationsBalance)    

  operationRouter.route('/operations/:operationId')
  .get(checkToken,
    validator.params(operationValidations.operationValidationsParams),
    controller.getOperationById)
  .put(checkToken,
    validator.params(operationValidations.operationValidationsParams),
    validator.body(operationValidations.operationValidationsPut),
    controller.putOperationById)
  .delete(checkToken,
    validator.params(operationValidations.operationValidationsParams),
    controller.deleteOperationById)
    
return operationRouter

}

module.exports = routes