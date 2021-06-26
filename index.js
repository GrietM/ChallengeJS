const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('express-jwt')
const Operation = require('./models/operationModel')
const operationRouter = require('./routes/operationRouter')(Operation) 
const User = require('./models/userModel.js')
const userRouter = require('./routes/userRouter.js')(User)

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api', operationRouter)
app.use('/api', userRouter)

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
