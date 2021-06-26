const mongoose = require("mongoose")

const {Schema} =  mongoose

const operationModel = new Schema ({
   concept:{type: String}, 
   amount: {type: Number},
   date :{type: Date},
   operationType:{type: String},
   user:{type: String}
},
{
  collection: 'operations'
})

module.exports = mongoose.model( "Operation", operationModel)