const express = require('express')
const operationControllers = require('../controllers/operationControllers')

const routes = (Operation) => {
  const operationRouter = express.Router()
  const controller = operationControllers(Operation)

  operationRouter.route('/admin/operations')
    .get (controller.getOperations)  
    .post (controller.postOperation) 
  
  operationRouter.route('/admin/operations/:operationId')
  .get(controller.getOperationById)
  .put(controller.putOperationById)
  .delete(controller.deleteOperationById)
    
  return operationRouter
}

module.exports = routes