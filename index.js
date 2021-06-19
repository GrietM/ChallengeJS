const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Operation = require('./models/operationModel')
const operationRouter = require('./routes/operationRouter')(Operation) 

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api', operationRouter)

const connectDB = async () => {
    try {
      await mongoose.connect("mongodb://localhost/ChallengeJS")
    } catch (error){
      throw error
    }
  }
  connectDB()

const port = 8080

app.listen(port, ()=> {
  console.log(`server started on port : ${port}`)
})
