const Joi = require ('joi')

const operationValidationsBody = Joi.object({
   concept:Joi.string().required(),
   amount:Joi.number().required(),
   date:Joi.date().required(),
   operationType:Joi.string().required()
})

const operationValidationsQuery = Joi.object({
    concept:Joi.string(),
    amount:Joi.number(),
    date:Joi.date(),
    operationType:Joi.string()
})

const operationValidationsParams = Joi.object({
  operationId: Joi.string().length(24).required()
})

const operationValidationsPut = Joi.object({
    concept:Joi.string(),
    amount:Joi.number(),
    date:Joi.date(),
    operationType:Joi.string()
})

module.exports = {operationValidationsBody, operationValidationsQuery, operationValidationsParams, operationValidationsPut}